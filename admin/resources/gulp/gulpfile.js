const path = {
    bem: '../css/bem',
    css: '../css/bem/*.blocks/**/*.css',
}
const gulp = require( 'gulp' );
const { watch } = require( 'gulp' );
const concat = require( 'gulp-concat' );
const watcher = watch( [ path.css ] );
const fs = require( 'fs' );
const postcss = require( 'gulp-postcss' );

const bemLevelsOrder = [ 'main', 'common', ];

function build() {
    const beginTime = Date.now();

    fs.readdir( path.bem, ( err, files ) => {
        const otherLevels = [];
        const orderedLevels = [];

        files.forEach( file => {
            if ( file.search( /^.*?\.blocks$/ ) !== 0 ) {
                return;
            }

            const levelName = file.split( '.' )[ 0 ];
            let index = bemLevelsOrder.indexOf( levelName );

            if ( index > -1 ) {
                orderedLevels[ index ] = path.bem + '/' + file + '/**/*.css';
            } else {
                otherLevels.push( path.bem + '/' + file + '/**/*.css' );
            }
        } );

        orderedLevels.push( ...otherLevels );

        const srcList = orderedLevels.reverse();

        gulp.src( srcList )
            .pipe( concat( 'bem.css' ) )
            .pipe( postcss( [
                require( 'postcss-nested' ),
                require( 'precss' ),
                require( 'cssnano' ),
                require( 'postcss-pxtorem' ),
            ] ) )
            .pipe( gulp.dest( '../css' ) );

        const executionTime = ( ( Date.now() - beginTime ) / 1000 ).toFixed( 3 );

        console.log( 'Build end in ' + executionTime + 's' );
    } );
}

watcher.on( 'all', function ( path, stats ) {
    build();
} );

gulp.task( 'default', function () {
    build();
} );
