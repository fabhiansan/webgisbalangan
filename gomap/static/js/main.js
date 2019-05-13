var sidebar = L.control.sidebar('sidebar', {
    closeButton: true,
    position: 'left'
});
map.addControl(sidebar);

setTimeout(function () {
    sidebar.show();
}, 500);

var marker = L.marker([51.2, 7]).addTo(map).on('click', function () {
    sidebar.toggle();
});

map.on('click', function () {
    sidebar.hide();
})

sidebar.on('show', function () {
    console.log('Sidebar will be visible.');
});

sidebar.on('shown', function () {
    console.log('Sidebar is visible.');
});

sidebar.on('hide', function () {
    console.log('Sidebar will be hidden.');
});

sidebar.on('hidden', function () {
    console.log('Sidebar is hidden.');
});

L.DomEvent.on(sidebar.getCloseButton(), 'click', function () {
    console.log('Close button clicked.');
});

function hideLoader() {
    $('#loading').hide();
}

$(window).ready(hideLoader);

// Strongly recommended: Hide loader after 20 seconds, even if the page hasn't finished loading
setTimeout(hideLoader, 20 * 1000);