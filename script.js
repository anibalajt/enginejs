var jsontext;
$(document).ready(function(){
    var text = "text.json";
    $.getJSON( text, {
        tags: "mount rainier",
        tagmode: "any",
        format: "json"
    })
    .done(function( data ) {
        console.log(data)
        jsontext = data
        generateUnit(data)
    });

})
function generateUnit(unit){
    var containerUnit =  $( "<div>", {"class": "unitContainer"});
    $("#container").append(containerUnit)
    var headerBar = $( "<div>", {
        "class": "headerBar",
        html: unit.title
    })
    $(containerUnit).append(headerBar,"<hr class='curl'>")
    _.map(unit.course,function(data,key){
        var courseTitle = $( "<div>", {
            "class": "unitHeadline",
            html: data.course
        })
        var courseText = $( "<div>", {
            "class": "unitText",
            html: data.text
        })
        var unitTextContainer = $( "<div>", {
            "class": "unitTextContainer",
            html: courseText
        })
        var unitFooter = $( "<div>", {
            "class": "unitFooter",
            "id":key,
            html: (data.state === 0)?"Download Unit":"View"
        })

        var course = $( "<div>", {
            "class": "unit"
        })
        $(".unitContainer").append(course)
        $(course).append(courseTitle,unitTextContainer,unitFooter)
    })
    $(".unitFooter").off().on("click",viewUnit);
}
function viewUnit(){
    console.log(jsontext.course[this.id].master[1])
    var unit = jsontext.course[this.id].master[0]

    $("#container").html('')
    var classRight
    if(unit.contentLeft){
        classRight ="right";
        var mainContainerLeft = $( "<div>", {
            "class": "mainContainerLeft"
        })
        $("#container").append(mainContainerLeft)

        var courseTitle = $( "<div>", {
            "class": "headline ",
            html: unit.titteLeft+"<hr class='curl'>"
        })
        var content = $( "<div>", {
            "class": "contentLeft",
        })
        $(mainContainerLeft).append(courseTitle,content)
        _.map(unit.contentLeft,function(data,key){
            var h3Title='';
            if(data.title){
                h3Title = $( "<h3>", {
                    "class": "h3Title",
                    html: data.title
                })
            }
            var h3SubTitle ='';
            if(data.subtitle){
                h3SubTitle = $( "<h3>", {
                    "class": "h3Title",
                    html: data.subtitle
                })
            }
            var pText = '';
            if(data.text){
                pText = $( "<p>", {
                    "class": "pText",
                    html: data.text
                })
            }
            $(content).append(h3Title,h3SubTitle,pText)
        })

    }


    var mainContainer = $( "<div>", {
        "class": "mainContainer "+classRight
    })
    $("#container").append(mainContainer)
    var courseTitle = $( "<div>", {
        "class": "headline ",
        html: unit.title+"<hr class='curl'>"
    })
    $(mainContainer).append(courseTitle)
    _.map(unit.contentRight,function(data,key){
        var h3Title = $( "<h3>", {
            "class": "h3Title",
            html: data.title
        })
        var pText='';
        if(data.text){
            pText = $( "<p>", {
                "class": "pText",
                html: data.text
            })
        }
        var ul='';
        if(data.pharases){
            ul = $( "<ul>", {})
            _.map(data.pharases,function(pharases,key){
                var li = $( "<li>", {
                    "class": "",
                    html: pharases
                })
                $(ul).append(li)
            })
        }
        $(mainContainer).append(h3Title,pText,ul)
    })


}
