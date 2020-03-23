// utilities
var get = function (selector, scope) {
    scope = scope ? scope : document;
    return scope.querySelector(selector);
};

var getAll = function (selector, scope) {
    scope = scope ? scope : document;
    return scope.querySelectorAll(selector);
};

// setup typewriter effect in the terminal demo
if (document.getElementsByClassName('demo').length > 0) {
    var i = 0;
    var txt = `

                >> perfx
                Enter r:10 to run the benchmarks 10 times
                Enter s to print the stats/details for the previous run
                Enter l:1h:10 to fetch app-insights duration logs for the previous run (in the last 1 hour with 10 retries)
                Enter c to clear the console
                Enter q to quit
                Enter ? to print this help

              > r:2
                Acquiring token for user@contoso.com ...
                Endpoints: 2
                Iterations: 2

                2.2 https://contoso.cloudapp.azure.com/odata/v1/route1?$top=100
                    opid: ffcadf8c-fba8-4c42-a500-1e916bef9fc1
                    stat:   200: OK
                    time:   5484.00ms (~5.48s)
                    size:   34.47KB

                2.1 https://contoso/odata/v1/route2?$top=100
                    opid: 32af7efe-f71d-4d75-b6c3-2fe0a579ddcf
                    stat:   200: OK
                    time:   5466.00ms (~5.47s)
                    size:   34.47KB

                1.2 https://contoso/odata/v1/entities1
                    opid: f6634c36-6118-4824-ae8b-af910d9209db
                    stat:   200: OK
                    time:   6576.00ms (~6.58s)
                    size:   398.77KB

                1.1 https://contoso.cloudapp.azure.com/odata/v1/entities2
                    opid: 44b92609-3c75-4cdd-82ba-f3f3fc50e2fa
                    stat:   200: OK
                    time:   7136.00ms (~7.14s)
                    size:   398.77KB

                > Fetch [4] durations from App-Insights? (Y/N) y
                  App-Insights [4]4.
                > Overwrite D:/Documents/Perfx/Perfx_Results.xlsx? (Y/N) y
                  Displaying charts...
            `;
    var speed = 15;

    function typeItOut() {
        if (i < txt.length) {
            document.getElementsByClassName('demo')[0].innerHTML += txt.charAt(i);
            //// hljs.initHighlighting.called = false;
            //// hljs.initHighlighting();
            // hljs.highlightBlock(document.getElementsByClassName('demo')[0])
            i++;
            setTimeout(typeItOut, speed);
        }
    }

    setTimeout(typeItOut, 1800);
}

// toggle tabs on codeblock
window.addEventListener("load", function () {
    // get all tab_containers in the document
    var tabContainers = getAll(".tab__container");

    // bind click event to each tab container
    for (var i = 0; i < tabContainers.length; i++) {
        get('.tab__menu', tabContainers[i]).addEventListener("click", tabClick);
    }

    // each click event is scoped to the tab_container
    function tabClick(event) {
        var scope = event.currentTarget.parentNode;
        var clickedTab = event.target;
        var tabs = getAll('.tab', scope);
        var panes = getAll('.tab__pane', scope);
        var activePane = get(`.${clickedTab.getAttribute('data-tab')}`, scope);

        // remove all active tab classes
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove('active');
        }

        // remove all active pane classes
        for (var i = 0; i < panes.length; i++) {
            panes[i].classList.remove('active');
        }

        // apply active classes on desired tab and pane
        clickedTab.classList.add('active');
        activePane.classList.add('active');
    }
});

//in page scrolling for documentaiton page
var btns = getAll('.js-btn');
var sections = getAll('.js-section');

function setActiveLink(event) {
    // remove all active tab classes
    for (var i = 0; i < btns.length; i++) {
        btns[i].classList.remove('selected');
    }

    event.target.classList.add('selected');
}

function smoothScrollTo(element, event) {
    setActiveLink(event);

    window.scrollTo({
        'behavior': 'smooth',
        'top': element.offsetTop - 20,
        'left': 0
    });
}

if (btns.length && sections.length > 0) {
    // for (var i = 0; i<btns.length; i++) {
    //   btns[i].addEventListener('click', function(event) {
    //     smoothScrollTo(sections[i], event);
    //   });
    // }
    btns[0].addEventListener('click', function (event) {
        smoothScrollTo(sections[0], event);
    });

    btns[1].addEventListener('click', function (event) {
        smoothScrollTo(sections[1], event);
    });

    btns[2].addEventListener('click', function (event) {
        smoothScrollTo(sections[2], event);
    });

    btns[3].addEventListener('click', function (event) {
        smoothScrollTo(sections[3], event);
    });
}

// fix menu to page-top once user starts scrolling
window.addEventListener('scroll', function () {
    var docNav = get('.doc__nav > ul');

    if (docNav) {
        if (window.pageYOffset > 63) {
            docNav.classList.add('fixed');
        } else {
            docNav.classList.remove('fixed');
        }
    }
});

// responsive navigation
var topNav = get('.menu');
var icon = get('.toggle');

window.addEventListener('load', function () {
    function showNav() {
        if (topNav.className === 'menu') {
            topNav.className += ' responsive';
            icon.className += ' open';
        } else {
            topNav.className = 'menu';
            icon.classList.remove('open');
        }
    }
    icon.addEventListener('click', showNav);
});
