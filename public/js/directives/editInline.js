/**
 * Created by naveed on 5/18/14.
 */
app.directive("editInline", function($window,$compile,$rootScope){
    return {
        require:'^ngModel',
        restrict: 'E',
        replace:true,
       // template: '<div class="form-group"><input type="text" class="form-control"/> <button class="col-sm-2 col-sm-offset-2 glyphicon glyphicon-trash"></button></div> ',
		template: '<div><input type="text" style="display: inline;" class="form-control"/><span     style="margin-left: 5px; display: inline; vertical-align: middle;" class="fa fa-trash-o fa-2x"></span></div> ',	
    link:  function(scope, elements, attrs,ngModel){
        // a method to update the width of an input
        // based on it's value.
        console.log(ngModel);
        console.log(attrs);
        var element=elements.find('input');

        element[0].value="ok";
        var btn=elements.find('button');
        btn.css('background-color', 'transparent');
        btn.css('border', 'none');

        console.log( element[0]);
        if(!element[0].width)
        {
            element.css('width', 'auto');
        console.log(element[0].width);
        }
      //  var width=$window.document.defaultView.getComputedStyle(element, '').width;
      //  var width=$window.document.defaultView.getComputedStyle(elements[0], '').width;
     //   element.css('border', 0 + 'px');
        var updateWidth = function () {
            // create a dummy span, we'll use this to measure text.
            var tester = angular.element('<span>'),

            // get the computed style of the input
                elemStyle = elements.find('input');
                  //  console.log(elemStyle.width);
            // apply any styling that affects the font to the tester span.
            tester.css({
                'font-family': elemStyle.fontFamily,
                'line-height': elemStyle.lineHeight,
                'font-size': elemStyle.fontSize,
                'font-weight': elemStyle.fontWeight
            });

            // update the text of the tester span
            tester.text(element.val());
          //  console.log(element);
            // put the tester next to the input temporarily.
            element.parent().append(tester);

            // measure!
            var r = tester[0].getBoundingClientRect();
            var w = r.width;
           // element.css('width', w + 'px');
            // apply the new width!

            if(w<=60)
                element.css('width',60+ 'px');
            else if(w>200)
                element.css('width','auto');
            else
                element.css('width', w+20+ 'px');

            /*if(element.val()=='')
                element.css('width',width);*/

            // remove the tester.
            tester.remove();
        };

        // initalize the input
      //  updateWidth();
       console.log( element);
        var attr;
        for (attr in attrs.$attr) {
            if(attrs.hasOwnProperty(attr)){
                console.log(attr)
                element.attr(attrs.$attr[attr], attrs[attr]);

            }
        }
      //  $compile(element.contents())(scope);
     //   element[0].setAttribute("ng-model","record.code");
        // do it on keydown so it updates "real time"
        element.bind("keydown", function(){
            updateWidth();
            // set an immediate timeout, so the value in
            // the input has updated by the time this executes.
          //  $window.setTimeout(updateWidth, 0);





        });
        function mouseove(){

        //    element.css('border',10 + 'px');
            element.css('border-color','red');

        }

        element.bind("mouseover", function(){
            //    element.css('border', 0 + 'px');
            // set an immediate timeout, so the value in
            // the input has updated by the time this executes.
               $window.setTimeout(mouseove, 0);
        });
        function mouseou(){

        //    element.css('border', 1 + 'px');

        }
        element.bind("mouseout", function(){
          //  $window.setTimeout(mouseou, 0);
          //  element.css('border', 2 + 'px');
            element.css('border-color','white');
            // set an immediate timeout, so the value in
            // the input has updated by the time this executes.
            //  $window.setTimeout(updateWidth, 0);
        });

        btn.bind("click",function(){
            console.log('click');
            console.log(element);
            element.val('');
            element.triggerHandler('input');
        //    var model = attrs['ngModel'];
          /*  var model=attrs.$attr['ngModel'];*/
          /*  ngModel.$setViewValue("")*/
           /* $rootScope[model] = 'baroo';
            console.log(ngModel.$viewValue);
            console.log(ngModel.$modelValue);*/

        })

       /* var model = attrs['ngModel'];

        // update the scope if model is defined
        if (model) {
            console.log(model);
            scope[model] = 'bar';
        }*/
        $compile(elements)(scope);
    }
}
});