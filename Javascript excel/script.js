$(document).ready(function() {
    var selectedFile;
    document
        .getElementById( "fileUpload" )
        .addEventListener( "change", function( event ) {
            selectedFile = event.target.files[0];
        } );
    // document.getElementById( "label" ).innerHTML = selectedFile.name;
    document
        .getElementById( "uploadExcel" )
        .addEventListener( "click", function() {
            if ( selectedFile ) {
                progressBar( "25%", "25", "w-25" );
                console.log( "hi" );
                var fileReader = new FileReader();
                fileReader.onload = function( event ) {
                    var data = event.target.result;

                    var workbook = XLSX.read( data, {
                        type: "binary"
                    });
                    progressBar( "50%", "50", "w-50" );
                    workbook.SheetNames.forEach( sheet => {
                        let rowObject = XLSX.utils.sheet_to_row_object_array(
                            workbook.Sheets[ sheet ]
                        );
                        let jsonObject = JSON.stringify( rowObject );
                        document.getElementById( "jsonData" ).innerHTML = jsonObject;
                        // console.log( jsonObject );
                        progressBar( "75%", "75", "w-75" );
                    });
                    progressBar( "100%", "100", "w-100" );
                };
                fileReader.readAsBinaryString( selectedFile );
            }
        });
});

function JSONtoTABLE() {
    var data = document.getElementById( "JSONstringToTable" ).value;
    data = JSON.parse( data );
    
    var headers = Object.keys( data[ 0 ] );

    var headerRowHTML = '<tr class="thead-dark">';
    for ( var i = 0; i < headers.length; i++ ) {
        headerRowHTML += '<th>' + headers[ i ] + '</th>';
    }
    headerRowHTML += '</tr>';

    var allRecordsHTML = '';
    for ( var i = 0; i < data.length; i++ ) {
        allRecordsHTML += '<tr>';
        for ( var j = 0; j < headers.length; j++ ) {
            var header = headers[ j ];
            allRecordsHTML += '<td>' + data[ i ][ header ] + '</td>';
        }
        allRecordsHTML += '</tr>';
    }

    var table = document.getElementById( "showDataTable" );
    table.innerHTML = headerRowHTML + allRecordsHTML;

    document.getElementById( "progressBarTable" ).classList.remove();
    document.getElementById( "progressBarTable" ).className = "progress-bar w-100";
    document.getElementById( "progressBarTable" ).innerText = "100%";
}

$(document).ready(function() {
    var selectedFile;
    document
        .getElementById( "fileUploadToTable" )
        .addEventListener( "change", function( event ) {
            selectedFile = event.target.files[0];
        } );
    // document.getElementById( "label" ).innerHTML = selectedFile.name;
    document
        .getElementById( "uploadExcelToTable" )
        .addEventListener( "click", function() {
            if ( selectedFile ) {
                console.log( "hi" );
                var fileReader = new FileReader();
                fileReader.onload = function( event ) {
                    var data = event.target.result;

                    var workbook = XLSX.read( data, {
                        type: "binary"
                    });
                    workbook.SheetNames.forEach( sheet => {
                        let rowObject = XLSX.utils.sheet_to_row_object_array(
                            workbook.Sheets[ sheet ]
                        );
                        let jsonObject = JSON.stringify( rowObject );
                        var data = JSON.parse(jsonObject);
                        
                        var headers = Object.keys( data[ 0 ] );

                        var headerRowHTML = '<tr class="thead-dark">';
                        for ( var i = 0; i < headers.length; i++ ) {
                            headerRowHTML += '<th>' + headers[ i ] + '</th>';
                        }
                        headerRowHTML += '</tr>';
                    
                        var allRecordsHTML = '';
                        for ( var i = 0; i < data.length; i++ ) {
                            allRecordsHTML += '<tr>';
                            for ( var j = 0; j < headers.length; j++ ) {
                                var header = headers[ j ];
                                allRecordsHTML += '<td>' + data[ i ][ header ] + '</td>';
                            }
                            allRecordsHTML += '</tr>';
                        }
                    
                        var table = document.getElementById( "showDataTableFromExcel" );
                        table.innerHTML = headerRowHTML + allRecordsHTML;   

                        // console.log( jsonObject );
                    });
                };
                fileReader.readAsBinaryString( selectedFile );
            }
        });
});

function progressBar( text, ariavalue, classname ) {
    var progressBar = document.getElementById( "progressBar" );
    progressBar.innerText = text;
    progressBar.ariaValueNow = ariavalue;
    progressBar.classList.remove();
    progressBar.className = "progress-bar " + classname;
}

function copyTable() {
    var copyText = document.getElementById( "showDataTable" );;
    copyText.select();
    copyText.setSelectionRange( 0, 9999999999 );

    navigator.clipboard.writeText( copyText.innerHTML );
    var btn = document.getElementById( "copyBtnTable" );
    btn.innerHTML = "Table copied!";
    const changeBackTxt = setTimeout( function() {
        btn.innerHTML = "Copy to clipboard"
    }, 2000);
}

function copy() {
    var copyText = document.getElementById( "jsonData" );
    copyText.select();
    copyText.setSelectionRange( 0, 9999999999 );

    navigator.clipboard.writeText( copyText.value );
    var btn = document.getElementById( "copyBtn" );
    btn.innerHTML = "Text copied!";
    const changeBackTxt = setTimeout( function() {
        btn.innerHTML = "Copy to clipboard"
    }, 2000);
}