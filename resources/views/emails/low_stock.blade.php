<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .header {
            background-color: #dc2626;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: white;
            padding: 30px;
            border-radius: 0 0 5px 5px;
        }
        .product-info {
            background-color: #fef2f2;
            border-left: 4px solid #dc2626;
            padding: 15px;
            margin: 20px 0;
        }
        .product-info h3 {
            margin: 0 0 10px 0;
            color: #dc2626;
        }
        .stock-warning {
            background-color: #fef2f2;
            border: 2px solid #dc2626;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
            margin: 20px 0;
        }
        .stock-number {
            font-size: 36px;
            font-weight: bold;
            color: #dc2626;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⚠️ Low Stock Alert</h1>
        </div>
        
        <div class="content">
            <p>Hello Admin,</p>
            
            <p>This is an automated alert to inform you that a product in your inventory is running low on stock.</p>
            
            <div class="product-info">
                <h3>Product Details:</h3>
                <p><strong>Name:</strong> {{ $product->name }}</p>
                <p><strong>Category:</strong> {{ $product->category ?? 'N/A' }}</p>
                <p><strong>Price:</strong> ${{ number_format($product->price, 2) }}</p>
            </div>
            
            <div class="stock-warning">
                <p style="margin: 0; font-size: 14px; color: #666;">Current Stock Level</p>
                <div class="stock-number">{{ $product->stock_quantity }}</div>
                <p style="margin: 5px 0 0 0; color: #dc2626; font-weight: bold;">
                    @if($product->stock_quantity == 0)
                        OUT OF STOCK!
                    @else
                        Only {{ $product->stock_quantity }} item{{ $product->stock_quantity != 1 ? 's' : '' }} remaining!
                    @endif
                </p>
            </div>
            
            <p><strong>Action Required:</strong></p>
            <ul>
                <li>Review inventory levels</li>
                <li>Consider restocking this product</li>
                <li>Update product availability if necessary</li>
            </ul>
            
            <p>Please take appropriate action to ensure product availability for your customers.</p>
            
            <p>Best regards,<br>
            <strong>{{ config('app.name') }} Inventory System</strong></p>
        </div>
        
        <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>