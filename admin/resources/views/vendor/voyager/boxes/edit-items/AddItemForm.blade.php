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
                <label for="inputMinPrice" class="m-0">Min price ($)</label>
                <br>
                <input type="text" name="min" id="inputMinPrice" />
            </div>

            <div>
                <label for="inputMaxPrice" class="m-0">Max price ($)</label> <br>
                <input type="text" name="max" id="inputMaxPrice" />
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
