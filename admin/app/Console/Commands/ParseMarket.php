<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class ParseMarket extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'parse-market';

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
        function loadPart($offset)
        {
            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => 'https://market.csgo.com/api/graphql',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => '{"operationName":"items","variables":{"filters":[],"order":{"id":"default","direction":"desc"},"offset":' . $offset . ',"count":100},"query":"query items($count: Int, $filters: [FilterInputType], $page: Int, $offset: Int, $order: OrderInputType!) {\\n  items(\\n    count: $count\\n    filters: $filters\\n    page: $page\\n    order: $order\\n    offset: $offset\\n  ) {\\n    paginatorInfo {\\n      count\\n      currentPage\\n      hasMorePages\\n      lastPage\\n      perPage\\n      total\\n      __typename\\n    }\\n    filters {\\n      id\\n      items {\\n        color\\n        id\\n        name\\n        plural\\n        icons\\n        items {\\n          color\\n          id\\n          name\\n          icons\\n          __typename\\n        }\\n        __typename\\n      }\\n      min_value\\n      max_value\\n      min_range\\n      max_range\\n      min\\n      max\\n      step\\n      name\\n      order\\n      type\\n      value\\n      open\\n      __typename\\n    }\\n    meta {\\n      title\\n      description\\n      __typename\\n    }\\n    data {\\n      color\\n      id\\n      currency\\n      stattrak\\n      slot\\n      popularity\\n      features\\n      rarity\\n      my_item\\n      rarity_ext {\\n        id\\n        name\\n        __typename\\n      }\\n      ctp\\n      quality\\n      phase\\n      descriptions {\\n        type\\n        value\\n        __typename\\n      }\\n      type\\n      tags {\\n        category\\n        category_name\\n        localized_category_name\\n        localized_tag_name\\n        internal_name\\n        name\\n        value {\\n          name\\n          link\\n          __typename\\n        }\\n        __typename\\n      }\\n      image_512\\n      image_100\\n      image_150\\n      image_300\\n      seo {\\n        category\\n        type\\n        __typename\\n      }\\n      market_hash_name\\n      market_name\\n      price\\n      stickers {\\n        image\\n        name\\n        __typename\\n      }\\n      __typename\\n    }\\n    paginatorInfo {\\n      count\\n      currentPage\\n      hasMorePages\\n      lastPage\\n      perPage\\n      total\\n      __typename\\n    }\\n    __typename\\n  }\\n}"}',
                CURLOPT_HTTPHEADER => array(
                    'accept: application/json, text/plain, */*',
                    'app-settings: lang=ru; currency=RUB',
                    'cache-control: no-cache',
                    'content-type: application/json',
                    'referer: https://market.csgo.com/ru/?priceMin=353&priceMax=1000000'
                ),
            ));

            $response = curl_exec($curl);

            curl_close($curl);
            $data = json_decode($response);

            $items = $data->data->items;

            return $items;
        }

        function parse()
        {
            $items = loadPart(0);
            $total = $items->paginatorInfo->total;
            $items = [];
            $perPage = 100;

            for ($offset = $perPage; $offset < $total; $offset += $perPage) {
                echo "Load from $offset to " . ($offset + 100) . "\n\r";
                $items = array_merge($items, loadPart($offset)->data);
            }

            Storage::disk('local')->put('parsed-market-skins.json', json_encode($items));
        }

        parse();

        return 0;
    }
}
