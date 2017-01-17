/*****************************************************************************
 *   This program is free software: you can redistribute it and/or modify    *
 *   it under the terms of the GNU General Public License as published by    *
 *   the Free Software Foundation, either version 3 of the License, or       *
 *   (at your option) any later version.                                     *
 *___________________________________________________________________________*
 *   This program is distributed in the hope that it will be useful,         *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the           *
 *   GNU General Public License for more details.                            *
 *___________________________________________________________________________*
 *   You should have received a copy of the GNU General Public License       *
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.   *
 *___________________________________________________________________________*
 *                             Created by  Qti3e                             *
 *        <http://Qti3e.Github.io>    LO-VE    <Qti3eQti3e@Gmail.com>        *
 *****************************************************************************/
var fs = require('fs');
var request = require('request');


function URL2File(url, file){
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFile("info/"+file, body, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved! <"+file+">");
            });
        }
    });
}
URL2File('http://127.0.0.1:8009/article/list', 'list.json');
request('http://127.0.0.1:8009/article/list', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body)
        for(var key in body){
            URL2File('http://127.0.0.1:8009/article/get/'+key, key+'.json')
        }
    }
});
