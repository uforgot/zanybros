// device check
let _detectClass = document.querySelector('html').className;
let _isMobile = !_detectClass.indexOf("mobile");
let _isTablet = false;

let _isEdge = _detectClass.indexOf('edge')!==-1;
let _isIE = _detectClass.indexOf('ie')!==-1 || _isEdge ? true : false;
if(!_isMobile){
    if(_detectClass.indexOf("tablet") === -1){
        _isTablet = false;
    }else{
        _isTablet = _detectClass.indexOf("ie");
    }
}else _isTablet = false;

let _isDeskTop = !_detectClass.indexOf('desktop');
if(!_isDeskTop && _isIE) _isDeskTop = true;