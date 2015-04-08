angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/results/details.html',
    "<div>\n" +
    "\tResults Details\n" +
    "</div>"
  );


  $templateCache.put('src/results/list.html',
    "<div>\n" +
    "\tFood List\n" +
    "\t<div ng-repeat=\"item in results\">\n" +
    "\t\t{{item.name}}<br>\n" +
    "\t\t{{item.description}}\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('src/results/results.html',
    "<div class =\"results\">\n" +
    "\t<div class=\"results-list\" ui-view=\"list\"></div>\n" +
    "\n" +
    "\t<div class=\"results-details\" ui-view=\"details\"></div>\n" +
    "</div>"
  );


  $templateCache.put('src/search/search.html',
    "<div>\n" +
    "\t<br>\n" +
    "\t<input ng-hide=\"showAdv\" ng-model=\"api.searchText\" ng-change=\"validate()\" style=\"border: 1px solid #000; height: 50px; width: 200px; font-size: 250%;\">\n" +
    "\n" +
    "\t<div ng-show=\"showAdv\">This is the advanced search<br>\n" +
    "\t\tLocation<input type=\"text\" ng-model=\"searchObj.location\"><br>\n" +
    "\t\tCalories<input type=\"text\" ng-model=\"searchObj.calories\"><br>\n" +
    "\t\tPrice<input type=\"text\" ng-model=\"searchObj.price\"><br>\n" +
    "\t</div>\n" +
    "\t\n" +
    "\t<a href=\"#/results\" ng-click=\"handleClick()\">Search</a>\n" +
    "\n" +
    "\t<div ng-hide=\"isValid\">Not valid input. Only letters are allowed.</div>\n" +
    "\n" +
    "\t<button ng-click=\"(showAdv)?showAdv=false:showAdv=true;\">Toggle Advanced Search</button>\n" +
    "\t\n" +
    "</div>"
  );

}]);
