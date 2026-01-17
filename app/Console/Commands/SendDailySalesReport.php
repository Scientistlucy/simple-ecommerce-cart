<?php

namespace App\Console\Commands;

use App\Mail\DailySalesReportMail;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class SendDailySalesReport extends Command
{
    protected $signature = 'report:daily-sales {date?}';
    protected $description = 'Send daily sales report to admin';

    public function handle()
    {
        // Get date (use parameter or today)
        $date = $this->argument('date') 
            ? Carbon::parse($this->argument('date')) 
            : Carbon::today();

        $this->info("Generating sales report for: {$date->toDateString()}");

        // Get all completed orders for the day
        $orders = Order::whereDate('created_at', $date)
            ->where('status', 'completed')
            ->with('orderItems.product')
            ->get();

        // Calculate sales data
        $salesData = $this->calculateSalesData($orders);
        $salesData['date'] = $date->toFormattedDateString();

        // Send email
        Mail::to(config('mail.admin_email'))
            ->send(new DailySalesReportMail($salesData, $date->toFormattedDateString()));

        $this->info("✅ Daily sales report sent successfully!");
        $this->info("Total Orders: {$salesData['total_orders']}");
        $this->info("Total Revenue: \${$salesData['total_revenue']}");

        return 0;
    }

    private function calculateSalesData($orders)
    {
        $totalOrders = $orders->count();
        $totalRevenue = $orders->sum('total_amount');
        $totalItemsSold = 0;
        $productSales = [];

        foreach ($orders as $order) {
            foreach ($order->orderItems as $item) {
                $totalItemsSold += $item->quantity;

                $productId = $item->product_id;
                
                if (!isset($productSales[$productId])) {
                    $productSales[$productId] = [
                        'name' => $item->product->name ?? 'Unknown Product',
                        'category' => $item->product->category ?? null,
                        'price' => $item->price,
                        'quantity_sold' => 0,
                        'revenue' => 0
                    ];
                }

                $productSales[$productId]['quantity_sold'] += $item->quantity;
                $productSales[$productId]['revenue'] += $item->price * $item->quantity;
            }
        }

        // Sort by quantity sold (descending)
        usort($productSales, function($a, $b) {
            return $b['quantity_sold'] - $a['quantity_sold'];
        });

        // Get best seller
        $bestSeller = !empty($productSales) ? [
            'name' => $productSales[0]['name'],
            'quantity' => $productSales[0]['quantity_sold']
        ] : null;

        // Calculate average order value
        $averageOrderValue = $totalOrders > 0 ? $totalRevenue / $totalOrders : 0;

        return [
            'total_orders' => $totalOrders,
            'total_revenue' => $totalRevenue,
            'total_items_sold' => $totalItemsSold,
            'products' => array_values($productSales),
            'best_seller' => $bestSeller,
            'average_order_value' => $averageOrderValue
        ];
    }
}