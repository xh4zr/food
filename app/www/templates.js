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
    "<div id = \"all\">\n" +
    "\t<br>\n" +
    "\t<br>\n" +
    "\t<div id = \"search\">\n" +
    "\t\t<input id = \"searchBar\"  ng-model=\"api.searchText\" ng-change=\"validate()\"><br>\n" +
    "\t</div>\n" +
    "\n" +
    "\t<div id = \"advanced\" ng-show=\"showAdv\"><br>\n" +
    "\t\tLocation<input id = \"advBar\" type=\"text\" ng-model=\"searchObj.location\"><br>\n" +
    "\t\tCalories<input id = \"advBar\" type=\"text\" ng-model=\"searchObj.calories\"><br>\n" +
    "\t\tPrice<input id = \"advBar\" type=\"text\" ng-model=\"searchObj.price\"><br>\n" +
    "\t</div>\n" +
    "\t\n" +
    "\n" +
    "\t<div ng-hide=\"isValid\">Not valid input. Only letters are allowed.</div>\n" +
    "\n" +
    "\t<div id = \"bothButtons\">\t\n" +
    "\t\t<a id = \"searchButton\" href=\"#/results\" ng-click=\"handleClick()\">Search</a>\n" +
    "\t\t<button id = \"toggleButton\" ng-click=\"(showAdv)?showAdv=false:showAdv=true;\">Toggle Advanced Search</button>\n" +
    "\t</div>\n" +
    "</div>\n"
  );

}]);
