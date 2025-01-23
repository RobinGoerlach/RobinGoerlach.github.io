(function ($) {
  $(document).ready(function () {
    // Adding line numbers to the pre blocks
    $("pre").each(function () {
      var pre = $(this).text().split("\n"); // Split the text of the pre block by line breaks
      var lines = new Array(pre.length + 1); // Initialize an array for line numbers
      for (var i = 0; i < pre.length; i++) {
        var wrap = Math.floor(pre[i].split("").length / 70); // Calculate how many wraps a line has if it's too long
        if (pre[i] == "" && i == pre.length - 1) {
          lines.splice(i, 1); // Remove last empty line if it's at the end
        } else {
          lines[i] = i + 1; // Assign line number
          for (var j = 0; j < wrap; j++) {
            lines[i] += "\n"; // Add extra line breaks for wrapping
          }
        }
      }
      // Add a new pre block with the line numbers before the original pre block
      $(this).before("<pre class='lines'>" + lines.join("\n") + "</pre>");
    });

    var headings = []; // Array to store headings

    // Function to collect headings and their offset position
    var collectHeaders = function () {
      headings.push({ top: $(this).offset().top - 15, text: $(this).text() });
    };

    // Collect headers based on their level (H1, H2, H3)
    if ($(".markdown-body h1").length > 1)
      $(".markdown-body h1").each(collectHeaders);
    else if ($(".markdown-body h2").length > 1)
      $(".markdown-body h2").each(collectHeaders);
    else if ($(".markdown-body h3").length > 1)
      $(".markdown-body h3").each(collectHeaders);

    // Event handler for scroll event
    $(window).scroll(function () {
      if (headings.length == 0) return true; // If no headings are found, do nothing
      var scrolltop = $(window).scrollTop() || 0; // Get the current scroll position
      if (headings[0] && scrolltop < headings[0].top) {
        $(".current-section").css({ opacity: 0, visibility: "hidden" }); // Hide current section if no heading is in view
        return false;
      }
      $(".current-section").css({ opacity: 1, visibility: "visible" }); // Show current section when a heading is in view
      // Loop through headings and update the current section's name when it scrolls past
      for (var i in headings) {
        if (scrolltop >= headings[i].top) {
          $(".current-section .name").text(headings[i].text); // Update current section's name
        }
      }
    });

    // When the current section link is clicked, scroll to the top
    $(".current-section a").click(function () {
      $(window).scrollTop(0);
      return false;
    });
  });
})(jQuery);
