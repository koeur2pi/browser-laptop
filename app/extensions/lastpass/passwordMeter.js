(function(f){var p=function(b,f){var a=0;if(""===f&&""===b)return 0;var c=b.toLowerCase(),d=f.toLowerCase();if(c===d||d&&-1!==c.indexOf(d)||d&&-1!==d.indexOf(c))return 1;a+=b.length;if(0<b.length&&7>=b.length)return 1;8<=b.length&&15>=b.length?a+=12:16<=b.length&&(a+=18);b.match(/[a-z]/)&&(a+=1);b.match(/[A-Z]/)&&(a+=5);b.match(/\d/)&&(a+=5);b.match(/.*\d.*\d.*\d/)&&(a+=5);b.match(/[!,@,#,$,%,^,&,*,?,_,~]/)&&(a+=5);b.match(/.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~]/)&&(a+=5);b.match(/(?=.*[a-z])(?=.*[A-Z])/)&&
(a+=2);b.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)&&(a+=2);b.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!,@,#,$,%,^,&,*,?,_,~])/)&&(a+=2);for(var c={},e=d=0,n=b.length;e<n;++e){var l=b.charAt(e);void 0===c[l]&&(c[l]=1,++d)}if(1===d)return 2;a*=2;0>a?a=0:100<a&&(a=100);return a};jQuery.fn.LP_addPasswordMeter=function(b,m){var a=LPTools.createElement("div","meterContainer"),c=LPTools.createElement("div","meter"),d=LPTools.createElement("div"),e=null;c.appendChild(d);a.appendChild(c);c=f(c);d=f(d);m&&
(e=LPTools.createElement("label","meterLabel","Strength"),a.appendChild(e),e=f(e),c.css("width","88%"),e.css("width","12%"));this.parent().append(a);this.LP_input("passwordMeter",function(a){var c=d,g=b?b.val():"",h=e,g=p(a,g,h),j="poor",k=Strings.translateString("Invalid");17>g||(34>g?(j="bad",k=Strings.translateString("Weak")):51>g?(j="ok",k=Strings.translateString("Okay")):68>g?(j="good",k=Strings.translateString("Good")):85>g?(j="great",k=Strings.translateString("Secure")):(j="best",k=Strings.translateString("Super!")));
c.attr("class",j);c.css("width",g+"%");h&&(a?(f(h.parent()).css("opacity",1),h.text(k),h.removeClass("strength")):(f(h.parent()).css("opacity",0.5),h.text(Strings.translateString("Strength")),c.attr("class","strength"),c.css("width","100%")))})}})(jQuery);
