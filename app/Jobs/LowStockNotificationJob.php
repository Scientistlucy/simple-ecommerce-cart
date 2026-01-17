<?php

namespace App\Jobs;

use App\Mail\LowStockAlertMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class LowStockNotificationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $product;

    public function __construct($product)
    {
        $this->product = $product;
    }

    public function handle(): void
    {
        Mail::to(config('mail.admin_email'))
            ->send(new LowStockAlertMail($this->product));
    }
}
