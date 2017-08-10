// device check
var _detectClass = document.querySelector('html').className;
var _isMobile = _detectClass.indexOf("mobile") == -1 ? false : true;
var _isTablet = false;
if(!_isMobile){
    if(_detectClass.indexOf("tablet") == -1){
        _isTablet = false;
    }else{
        _isTablet = _detectClass.indexOf("ie") == -1 ? true : false;
    }
}else _isTablet = false;

console.log("this browser is -> " + _detectClass);
