<div class="addItemForm mt-[40px]" data-case-id="{{ $case->id }}">
    <h2>Add Item</h2>

    <h3>Add random item based on specified fields</h3>
    <h4>Presets</h4>

    <div class="presets">
        <button class="randomItem" data-min="5" data-max="10" data-rarity="consumer-grade">Junk for 5-10$</button>
    </div>

    <h4>Detailed</h4>
    <form>
        <div>
            <div>
                <label for="inputMinPrice" class="m-0">Text Search</label>
                <br>
                <input type="text" name="text" id="inputText" />
            </div>

            <div>
                <label for="inputMinPrice" class="m-0">Min price ($)</label>
                <br>
                <input type="text" name="min" id="inputMinPrice" />
            </div>

            <div>
                <label for="inputMaxPrice" class="m-0">Max price ($)</label> <br>
                <input type="text" name="max" id="inputMaxPrice" />
            </div>


            <div>
                <label for="quality" class="m-0">Quality</label>
                @php
                    $options = [
                        ['title' => 'Factory New', 'value' => 'FN', 'default' => 1],
                        ['title' => 'Minimal Wear', 'value' => 'MW', 'default' => 0],
                        ['title' => 'Field-Tested', 'value' => 'FT', 'default' => 0],
                        ['title' => 'Well-Worn', 'value' => 'WW', 'default' => 0],
                        ['title' => 'Battle-Scarred', 'value' => 'BS', 'default' => 0],
                    ];
                @endphp

                <select name="quality" id="quality">
                    @foreach($options as $option)
                        <option
                            value="{{ $option['value'] }}"
                            @if($option['default'])
                                selected
                            @endif
                        >
                            {{ $option['title'] }}
                        </option>
                    @endforeach
                </select>
            </div>
        </div>

        <div>
            <label for="selectType" class="m-0">Select type</label> <br>
            <select name="rarity" id="selectType" multiple style="height: 140px; overflow: hidden">
                <option value="consumer-grade">consumer-grade</option>
                <option value="industrial-grade">industrial-grade</option>
                <option value="mil-spec-grade">mil-spec-grade</option>
                <option value="restricted">restricted</option>
                <option value="classified">classified</option>
                <option value="covert">covert</option>
                <option value="contraband">contraband</option>
            </select>
        </div>

        <button>Add Random</button>
    </form>
</div>
