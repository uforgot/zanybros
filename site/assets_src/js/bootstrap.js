// device check
let _detectClass = document.querySelector('html').className;
let _isMobile = !_detectClass.indexOf("mobile");
let _isTablet = false;
if(!_isMobile){
    if(_detectClass.indexOf("tablet") === -1){
        _isTablet = false;
    }else{
        _isTablet = _detectClass.indexOf("ie");
    }
}else _isTablet = false;