if (!window.skillsChart) window.skillsChart = {};
var skillsChart = window.skillsChart;

(function($) {

    skillsChart.drawSkills = function() {
        //Stolen and a bit hacked around with from here http://raphaeljs.com/pie.js
        Raphael.fn.pieChart = function (cx, cy, r, datatable, stroke) {
            var paper = this,
                rad = Math.PI / 180,
                chart = this.set(),
                values = [],
                labels = [];
            $(datatable).find("tbody tr").each(function () {
                values.push(parseInt($("td", this).text(), 10));
                labels.push($("th", this).text());
            });
            function sector(cx, cy, r, startAngle, endAngle, params) {
                var x1 = cx + r * Math.cos(-startAngle * rad),
                    x2 = cx + r * Math.cos(-endAngle * rad),
                    y1 = cy + r * Math.sin(-startAngle * rad),
                    y2 = cy + r * Math.sin(-endAngle * rad);
                return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
            }
            var angle = 0,
                total = 0,
                start = .400,
                process = function (j) {
                    var value = values[j],
                        angleplus = 360 * value / total,
                        popangle = angle + (angleplus / 2),
                        color = "hsb(" + start + ", .2, .7)",
                        ms = 500,
                        delta = 30,
                        bcolor = "hsb(" + start + ", .2, 1)",
                        p = sector(cx, cy, r, angle, angle + angleplus, {gradient: "90-" + bcolor + "-" + color, stroke: stroke, "stroke-width": 2}),
                        txt = paper.text(cx + (r + delta + 55) * Math.cos(-popangle * rad), cy + (r + delta + 25) * Math.sin(-popangle * rad), labels[j]).attr({fill: bcolor, stroke: "none", opacity: 0, "font-family": 'Fontin-Sans, Arial', "font-size": "20px"});
                    p.mouseover(function () {
                        p.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, ms, "elastic");
                        $(datatable).find("tbody tr").eq(j).addClass('selected');
                    }).mouseout(function () {
                        p.stop().animate({transform: ""}, ms, "elastic");
                        $(datatable).find("tbody tr").eq(j).removeClass('selected');
                    });
                    angle += angleplus;
                    chart.push(p);
                    chart.push(txt);
                    start += .1;
                };
            for (var i = 0, ii = values.length; i < ii; i++) {
                total += values[i];
            }
            for (var i = 0; i < ii; i++) {
                process(i);
            }
            return chart;
        };
        (function (raphael) {
            $(function () {
                raphael("skills", 340, 340).pieChart(170, 170, 150, $("#skills-table"), "#fff");
            });
        })(Raphael.ninja());
    }

    Modernizr.load({
        test: "undefined" == typeof window.Raphael,
        yep: {
            'r': 'common/js/mylibs/raphael-min.js',
            'g': 'common/js/mylibs/g.raphael.js',
            'p': 'common/js/mylibs/g.pie-min.js'
        },
        callback: {
            'p': function (url, result, key) {
                skillsChart.drawSkills();
            }
        }
    });
})(jQuery);