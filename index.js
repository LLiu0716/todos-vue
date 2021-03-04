function createArr ( size ) {
  var len = size / 100
  var create = []
  for ( var i = 0; i < 100; i++ ) {
    for ( var j = 0; j < len; j++ ) {
      create.push( j )
    }
  }

  return create
}


// 以回调的方式
function checkTime ( fn ) {
  var date1 = new Date().getTime()
  var create = fn()
  var date2 = new Date().getTime()
  return {
    create: create,
    time: date2 - date1
  }
}

// function singelArray3 ( array ) {
//   var obj = {};
//   var temp = []
//   for ( var i = 0; i < array.length; i++ ) {
//     if ( !obj[ array[ i ] ] ) {
//       temp.push( array[ i ] );
//       obj[ array[ i ] ] = 1;
//     }

//   }
//   return temp
// }
// var lgArr = createArr( 1000000 )
// function singelArray4 ( array ) {
//   return new Array( ...( new Set( array ) ) )
// }
// var res3 = checkTime( function () { return singelArray3( lgArr ) } )

// var res4 = checkTime( function () { return singelArray4( lgArr ) } )


function fn1 ( params ) {
  let arr = []
  for ( let i = 0; i < params.length; i++ ) {
    if ( i == 50 ) {
      return
    }
    arr.unshift( i )
  }
  return arr
}

function fn2 ( params ) {
  let arr = []
  params.forEach( ( v, i ) => {
    if ( i == 50 ) {
      return
    }
    arr.unshift( i )
  } )
  return arr
}

const lgArr = createArr( 5000 )

const res3 = checkTime( function () { return fn1( lgArr ) } )

const res4 = checkTime( function () { return fn2( lgArr ) } )


console.log( 'for,', res3 )
console.log( 'forEach', res4 )
