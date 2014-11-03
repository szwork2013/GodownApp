app.directive('fmtDate', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
        console.log('fmt_date');
            modelCtrl.$parsers.push(function (inputValue) {
                console.log('formatting date:'+inputValue);
                var date = new Date(inputValue);
                var transformedInput=date.toLocaleDateString();

                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;

            });
        }
    };
});