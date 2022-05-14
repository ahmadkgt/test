
$(document).ready(function() {

	// $.ajax({

	// 	url:"API/get_ads.php",
	// 	success:function(data){
	// 		if(data.trim() != "empty") {
	// 			var ads = data.trim();
	// 			Swal.fire(
	// 					{html : ads,
	// 					title : "تنبيه",
	// 					icon: 'warning',
	// 					});

	// 		} 
	// 	}
	//   });

	var ads = "<div style='text-align:center'><h3>بناء على العطلة الرسمية المقررة من رئاسة مجلس الوزراء </h3>"+
	// "<h4>تؤجل مواعيد يوم الاثنين ٢ ايار الى يوم الاثنين ٩ ايار</h4>"+
	// // "<strong>من تاريخ 20/3 الى تاريخ  27/3</strong><br>"+
	// // "<strong>من تاريخ 24/1 الى تاريخ  31/1</strong><br>"+
	// // "<strong>من تاريخ 25/1 الى تاريخ  1/2</strong><br>"+
	// // "<strong>من تاريخ 26/1 الى تاريخ  2/2</strong><br>"+
	// // "<strong>من تاريخ 27/1 الى تاريخ  3/2</strong><br>"+
	// "</div>";
	// Swal.fire(
	// 	{html : ads,
	// 	title : "تنبيه",
	// 	icon: 'warning',
	// 	});

	
	$("input[type=\"radio\"]").click(
		function(){ 
		var thisElem = $(this); 
		var value = thisElem.val(); 
		localStorage.setItem("option", value); });
		 var itemValue = localStorage.getItem("option"); 
		 if (itemValue !== null) { $("input[value=\""+itemValue+"\"]").click(); }

    /************************************/
    var val = $("input[name='applied_kind']:checked").val();
    if(val == '1')
        $("#nat_num_ext").css('display','none');
    else
         $("#nat_num_ext").css('display','block');

    $('input[type=radio][name=applied_kind]').change(function() {
        if (this.value == '1') {
            $("#nat_num_ext").css('display','none');
        }
        else if (this.value == '2') {
            $("#nat_num_ext").css('display','block');

            Swal.fire(
                {text :  "هذا الخيار مخصص للمقيمين داخل القطر و يرغبون بتقديم طلب لذويهم خارج القطر ",
                title : "تنبيه",
                icon: 'warning',
                });
        }
    });

    /*****************************************/
        
	
    var today = new Date(); 
    $("#register").click(function() {
    var nat_num = $("#nat_num").val().trim();
  
    var first_name     = $("#first_name").val().trim();
    var last_name      = $("#last_name").val().trim();
    var father_name    = $("#father_name").val().trim();
    var mother_name     = $("#mother_name").val().trim();
  
    var mobile_num      = $("#mobile_num").val().trim();
    var center          = $("select#center option").filter(":selected").val();
   
    var applied_kind      = $("input[name='applied_kind']:checked").val();
	var nat_num_ext = "";
	if(applied_kind == 2)
    	 nat_num_ext = $("#nat_num_ext").val();
	else
		nat_num_ext = "";
    var captcha =     $("#captcha").val().trim();
    var cop_num = $("#cop_num").val().trim() != "" ? $("#cop_num").val().trim() :0;
    



    if(nat_num.trim().length != 11)
    {
        $("#msgdiv").html("يرجى التأكد من الرقم الوطني");
        return;

    }

    if(applied_kind == 2 && nat_num_ext.trim().length != 11)
    {
        $("#msgdiv").html(" يرجى التأكد من الرقم الوطني لصاحب الجواز");
        return;

    }
/***************************************************************************************** */
	if(applied_kind == 1 && (center == 1 || center == 2) && nat_num.startsWith("900") )
    {
		Swal.fire(
			{text : "يرجى اختيار فرع هجرة فلسطين",
			icon : "error",
			allowOutsideClick : false,
			title : "تنبيه"
			});
		return;
    }

	if(applied_kind == 2 && (center == 1 || center == 2) && nat_num_ext.startsWith("900") )
    {
		Swal.fire(
			{text : "يرجى اختيار فرع هجرة فلسطين",
			icon : "error",
			allowOutsideClick : false,
			title : "تنبيه"
			});
		return;
    }

/****************************************************************************************** */
    if(mobile_num.trim().length != 10)
    {
        $("#msgdiv").html("يرجى التأكد من رقم الموبايل");
        return;
    }

    if(parseInt(cop_num) >= 10)
    {
        $("#msgdiv").html("لقد تم تجاوز العدد الاقصى للمرافقين");
        return;
    }

    var myArray = {
        nat_num: fixNumbers(nat_num),
        first_name: first_name,
        last_name: last_name,
        father_name: father_name,
        mother_name: mother_name,
        mobile_num: fixNumbers(mobile_num),
        applied_kind: applied_kind,
        center:center,
        nat_num_ext: fixNumbers(nat_num_ext),
        captcha : captcha,
        cop_num : cop_num
        };

     
var appoinment_date="2022-07-07"
                                   document.cookie = "appoinment_date="+appoinment_date+";secure"; 
  $("body").css("cursor","progress");
                                    $("#register").prop("disabled",true);
                                     $.ajax({
                                        type:"POST",
                                        data:myArray,
                                        url:"API/register.php",
                                        success:function(data){
                                            if(data.trim().indexOf("cannot") > -1) {

                                            Swal.fire({
                                                title:"تحذير",
                                                icon:"error",
                                                text:"حدث خطأ , يرجى المحاولة لاحقا"
                                            });
                                            $("body").css("cursor","default");
                                          $("#register").prop("disabled",false);

                                            } 
                                            else if(data.trim().indexOf("success") > -1) {

												Swal.fire({
													title:"انتظار",
													icon:"info",
													showConfirmButton : false,
													allowOutsideClick : false,
													text:"تم تثبيت الموعد بنجاح , يرجى انتظار واجهة معلومات الحجز و الرسالة"
												});

                                                window.location="appointment.php?status=reg";
                                              
                                            } 
											else if(data.trim() == "End")
											{
												Swal.fire(
													{text : "لا يوجد مواعيد متاحة حاليا",
													icon : "error",
													title : "عذرا"
													});
												$("body").css("cursor","default");
                                                $("#register").prop("disabled",false);

												return;
											}
                                            else if(data.trim() == "exists"){
												Swal.fire({
													title:"تحذير",
													icon:"error",
													text:"هناك حجز مسبق"
												});

                                                $("body").css("cursor","default");
                                                $("#register").prop("disabled",false);
												return;
                                            }
                                        },
										fail: function(xhr, textStatus, errorThrown){
											Swal.fire({
												title:"تحذير",
												icon:"error",
												text:"حدثت مشكلة , يرجى المحاولة لاحقا"
											});
											$("body").css("cursor","default");
											 $("#register").prop("disabled",false);
										 },
										 error: function(xhr, status, error){
											 
											Swal.fire({
												title:"تحذير",
												icon:"error",
												text:"حدثت مشكلة , يرجى المحاولة لاحقا"
											});
											$("body").css("cursor","default");
											   $("#register").prop("disabled",false);
										}
                                });
                            } 
                            document.getElementById("dat").innerHTML='<input id="datepicker" type="text" style="display:none;"  placeholder="اضغط هنا لاختيار موعد الحجز" name="date" value=""  class="datepicker form-control" autocomplete="off" readonly/>';

                           
                        });
                        },
						fail: function(xhr, textStatus, errorThrown){
							
							$("body").css("cursor","default");
                             $("#register").prop("disabled",false);
						 },
						 error: function(data){
							
							$("body").css("cursor","default");
                               $("#register").prop("disabled",false);
						}
            }); 
   }
   else {

            $("#msgdiv").html("يرجى استكمال كافة البيانات");
     
       }
    });

    $("#back").click(function() {

        window.location="index.php";

    });


 
    }); 
    
var
persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
fixNumbers = function (str)
{
if(typeof str === 'string')
{
    for(var i=0; i<10; i++)
    {
    str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
}
return str;
};    


					
				