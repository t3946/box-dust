export class HttpDownloader {
    static baseUrl = 'http://laravel/api';

    static async get( path ) {
        return await axios.get( HttpDownloader.baseUrl + `/${ path }` );
    }

    static async post( path ) {
        return await axios.post( HttpDownloader.baseUrl + `/${ path }` );
    }
}
