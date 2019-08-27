(function($){
    "use strict";
    jQuery(document).ready(function($) {

        if($("a[rel^='prettyPhoto']").length){
            $("a[rel^='prettyPhoto']").prettyPhoto({
                animation_speed:'normal',
                slideshow:3000,
                autoplay_slideshow: false,
                social_tools: false
            });
        }


        var is_sending = false;

        $('#cctContactForm').submit(function (e) {
            if (is_sending || !validateInputs()) {
                return false; // Don't let someone submit the form while it is in-progress...
            }
            e.preventDefault(); // Prevent the default form submit
            var $this = $(this); // Cache this
            $.ajax({
                url: script_params.ajax_url, // Let WordPress figure this url out...
                type: 'post',
                dataType: 'JSON', // Set this so we don't need to decode the response...
                data: $this.serialize(), // One-liner form data prep...
                beforeSend: function () {
                    is_sending = true;
                    // You could do an animation here...
                },
                error: handleFormError( "Message wasn't send. Error occured." ),
                success: function (data) {
                    if (data.status === 'success') {
                        // Here, you could trigger a success message
                        $('#cct_contact_error').html( data.message );
                    } else {
                        handleFormError( data.message ); // If we don't get the expected response, it's an error...
                    }
                }
            });
        });

        function handleFormError ( error ) {

            is_sending = false; // Reset the is_sending var so they can try again...
            $('#cct_contact_error').html( error );
        }

        function validateInputs () {
            var $name = $('#cctContactName').val(),
                $email = $('#cctEmail').val(),
                $message = $('#cctCommentsText').val();
            if (!$name || !$email || !$message) {
                $('#cct_contact_error').html('Before sending, please make sure to provide your name, email, and message.');
                return false;
            }
            return true;
        }
    });
})(jQuery);