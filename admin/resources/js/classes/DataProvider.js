import {HttpDownloader} from './HttpDownloader';

export class DataProvider {
    static async getLastPrize() {
        return await HttpDownloader.get( 'last-prize.blocks' );
    }
}
