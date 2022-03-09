document.addEventListener('DOMContentLoaded', () =>
{
    let input_city = document.querySelector( '#registration_form_city' ),
        container_input_city = document.querySelector( '.search-city__container-input' )
        input_longitude = document.querySelector( '#registration_form_longitude' ),
        input_latitude = document.querySelector( '#registration_form_latitude' ),
        container_results = document.querySelector( '.search-city__container-results' ),
        remove_button = document.querySelector( '.search-city__remove' ),
        api_url = 'https://api-adresse.data.gouv.fr/search/?q=%%&type=municipality&autocomplete=1'

    let remove_value = () =>
    {
        // input must be editable
        input_city.removeAttribute( 'readonly' )

        // hide remove button
        remove_button.classList.remove( 'active' )

        // input is empty
        input_city.classList.remove( 'filled' )

        // remove value ine each input
        input_city.value = ''
        input_latitude.value = ''
        input_longitude.value = ''
    }

    // select the result
    let select_result = result =>
    {
        // hide container results
        container_results.classList.remove( 'active' )

        // show remove button
        remove_button.classList.add( 'active' )
        
        // prevent the change of the value
        input_city.setAttribute( 'readonly', true )

        // input is filled
        input_city.classList.add( 'filled' )

        // set value in each input
        input_city.value = result.innerText
        input_latitude.value = result.getAttribute( 'latitude' )
        input_longitude.value = result.getAttribute( 'longitude' )
    }

    // display results
    let display_results = json =>
    {
        if ( json.features.length == 0 ) return

        // clean container HTML
        container_results.innerHTML = ''
        

        // Loop on the result and display them
        json.features.forEach( item =>
        {
            container_results.innerHTML += `<span latitude="${item.geometry.coordinates[1]}" longitude="${item.geometry.coordinates[0]}">${item.properties.city}, ${item.properties.postcode}</span>`
        } )

        // attach event on each result
        container_results.querySelectorAll( 'span' ).forEach( item => item.addEventListener( 'click', function() { select_result(this) } ) )
    }

    // search cities if there is a value
    let search_cities = () =>
    {
        // If there is no value we hide container results
        if ( input_city.value.length < 2 || input_city.classList.contains( 'filled' ) ) {
            container_results.classList.remove( 'active' )
            return
        }

        // hide remove button
        remove_button.classList.remove('active')

        fetch( api_url.replace( '%%', input_city.value ) )
        .then( async response =>
        {
            const json = await response.json()
            display_results( json )
        } )

        // show container results and remove all previous results
        container_results.classList.add( 'active' )
        container_results.innerHTML = 'Loading...'
    }

    input_city.addEventListener( 'keyup', search_cities )
    remove_button.addEventListener( 'click', remove_value )
})
