<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .header p {
            margin: 5px 0 0 0;
            opacity: 0.9;
        }
        .summary {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            padding: 30px;
            background-color: #f9fafb;
        }
        .summary-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .summary-card h3 {
            margin: 0 0 10px 0;
            color: #666;
            font-size: 14px;
            text-transform: uppercase;
        }
        .summary-card .value {
            font-size: 32px;
            font-weight: bold;
            color: #667eea;
        }
        .content {
            padding: 30px;
        }
        .sales-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .sales-table th {
            background-color: #667eea;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
        }
        .sales-table td {
            padding: 12px;
            border-bottom: 1px solid #e5e7eb;
        }
        .sales-table tr:hover {
            background-color: #f9fafb;
        }
        .no-sales {
            text-align: center;
            padding: 40px;
            color: #666;
        }
        .no-sales-icon {
            font-size: 48px;
            margin-bottom: 10px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #e5e7eb;
        }
        .total-row {
            background-color: #f0f4ff;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Daily Sales Report</h1>
            <p>{{ $date }}</p>
        </div>

        <div class="summary">
            <div class="summary-card">
                <h3>Total Orders</h3>
                <div class="value">{{ $salesData['total_orders'] }}</div>
            </div>
            <div class="summary-card">
                <h3>Items Sold</h3>
                <div class="value">{{ $salesData['total_items_sold'] }}</div>
            </div>
            <div class="summary-card">
                <h3>Revenue</h3>
                <div class="value">${{ number_format($salesData['total_revenue'], 2) }}</div>
            </div>
        </div>

        <div class="content">
            @if(count($salesData['products']) > 0)
                <h2 style="color: #333; margin-bottom: 20px;">Products Sold Today</h2>
                
                <table class="sales-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Quantity Sold</th>
                            <th>Price</th>
                            <th>Total Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($salesData['products'] as $product)
                        <tr>
                            <td>{{ $product['name'] }}</td>
                            <td>{{ $product['category'] ?? 'N/A' }}</td>
                            <td>{{ $product['quantity_sold'] }}</td>
                            <td>${{ number_format($product['price'], 2) }}</td>
                            <td>${{ number_format($product['revenue'], 2) }}</td>
                        </tr>
                        @endforeach
                        <tr class="total-row">
                            <td colspan="2"><strong>TOTAL</strong></td>
                            <td><strong>{{ $salesData['total_items_sold'] }}</strong></td>
                            <td></td>
                            <td><strong>${{ number_format($salesData['total_revenue'], 2) }}</strong></td>
                        </tr>
                    </tbody>
                </table>

                <div style="margin-top: 30px; padding: 15px; background-color: #f0f9ff; border-left: 4px solid #667eea; border-radius: 4px;">
                    <p style="margin: 0;"><strong>💡 Insights:</strong></p>
                    <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                        <li>Best selling product: <strong>{{ $salesData['best_seller']['name'] ?? 'N/A' }}</strong> ({{ $salesData['best_seller']['quantity'] ?? 0 }} units)</li>
                        <li>Average order value: <strong>${{ number_format($salesData['average_order_value'], 2) }}</strong></li>
                    </ul>
                </div>
            @else
                <div class="no-sales">
                    <div class="no-sales-icon">📭</div>
                    <h3>No Sales Today</h3>
                    <p>There were no products sold on {{ $date }}.</p>
                </div>
            @endif
        </div>

        <div class="footer">
            <p>This is an automated daily sales report.</p>
            <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>