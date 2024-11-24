<?php

namespace App\Console\Commands;

use App\Models\CSItem;
use App\Services\FixCsItemImage;
use Illuminate\Console\Command;

class fixItemImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix-images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $items = CSItem::query()
            ->where('quality', 'FN')
            ->where('is_image_fixed', 0)
            ->get();

        $this->info('Items total: ' . $items->count());
        $progressBar = $this->output->createProgressBar($items->count());

        foreach ($items as $item) {
            FixCsItemImage::uploadFromSteam($item);
            $progressBar->advance();
        }

        $progressBar->finish();
    }
}
