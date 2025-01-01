<?php
/*
 * Functions required for edit modules.
 *
 */

/**
 * Defining global variables
 */
global $post_id;
global $data;
global $post;
global $array_of_pages;
//error_reporting(E_ALL);
/**
 * Check and initialize array on variable and specified key
 */
function init_array_on_var_and_array_key($var, $key) {
	if (!is_array($var)) {
		$var = array();
	}
	if (!is_array($var[$key])) {
		$var[$key] = array();			
	}

	return $var;
}

/**
 * Function for additional column for table on list pages screen in administration
 */
function page_pt_columns( $columns ) {
	$new_columns = array(
		'template' => __( 'Template', 'balance_theme' )
	);
	return array_merge( $columns, $new_columns );
}
add_filter( 'manage_page_posts_columns' , 'page_pt_columns' );

/**
 * Additional column condition (display used template name for each page)
 */
function custom_page_pt_columns( $column, $post_id ) {
	switch ( $column ) {
	case 'template' :
		$current_template = get_page_template_slug( $post_id );
		$available_templates = get_page_templates();
		foreach ( $available_templates as $key => $template ) {
			if ( $template == $current_template ) {
				echo $key . ' Template';
			} else if ( $current_template == '' ) {
					echo 'Default Template';
					break;
				}
		}
		break;
	}
}
add_action( 'manage_pages_custom_column' , 'custom_page_pt_columns', 10, 2 );

/**
 * Main function to retrieve pages array from db using get_posts()
 *
 * @return array list of published pages from db (includes id, title, permalink)
 */
function get_array_of_pages( $return = true ) {

	global $array_of_pages;

	$published_pages_args = array(
		'post_type' => array( 'page' ),
		'numberposts' => -1,
		'post_status' => 'publish'
	);

	$published_pages = get_posts( $published_pages_args );

	$array_of_pages = array();

	foreach ( $published_pages as $page ) {
		$obj = get_post_type_object( $page->post_type );
		$array_of_pages[] = array(
			"id" => $page->ID,
			"title" => $page->post_title,
			'permalink' => get_relative_permalink( $page->ID )
		);
	}

	if ( $return ) {
		return $array_of_pages;
	}
}

/**
 * Function to retrieve attachments array from db using get_posts()
 *
 * @param unknown $array_allowed_files that defines which files are allowed in dropdown
 * @return array list of files from db (includes id, title, permalink)
 */
function get_attachments_array( $array_allowed_files ) {
	$array_of_files = array();
	$published_pages_args = array(
		'post_type' => 'attachment',
		'post_mime_type' => $array_allowed_files,
		'posts_per_page' => -1
	);
	$published_files = get_posts( $published_pages_args );
	foreach ( $published_files as $file ) {
		$array_of_files[] = array(
			"id" => $file->ID,
			"title" => $file->post_title,
			'permalink' => get_relative_permalink( $file->ID )
		);
	}

	return $array_of_files;
}

/**
 * Main function to save custom data from modules into db (inserts if meta does not exists else updates)
 *
 * @param unknown $post_id int id of the post_type for which we want to update custom data
 *
 */
function update_edit_data( $post_id ) {
	global $post_type;
	global $wpdb;

	// handle the case when the custom post is quick edited
	// otherwise all custom meta fields are cleared out
	if ( !isset( $_POST['whole_edit_screen'] ) ) {
		return;
	}

	// handle the case when the custom post is quick edited
	// otherwise all custom meta fields are cleared out

	if ( isset( $_POST['_inline_edit'] ) ) {
		if ( wp_verify_nonce( $_POST['_inline_edit'], 'inlineeditnonce' ) )
			return;
	}
	$post_data_array = array();
	$date_from = '';
	$date_to = '';
	$time_from = '';
	$location = '';

	// read all the fields from $_POST object and add them to the array which will be serialized and saved into db

	foreach ( $_POST as $key => $value ) {
		$post_data_array[$key] = $value;
	}

	$custom_data = get_post_custom( $post_id );
	if ( isset( $custom_data['_page_edit_data'] ) ) { // there is already meta data, update
		update_post_meta( $post_id, '_page_edit_data', $post_data_array );
	} else { // there is no data yet, insert
		add_post_meta( $post_id, '_page_edit_data', $post_data_array, true );
	}

	if ( isset( $custom_data['_page_edit_data_base64'] ) ) { // there is already meta data, update
		update_post_meta( $post_id, '_page_edit_data_base64', base64_encode( serialize( $post_data_array ) ) );
	} else { // there is no data yet, insert
		add_post_meta( $post_id, '_page_edit_data_base64', base64_encode( serialize( $post_data_array ) ), true );
	}
}
add_action( 'save_post', 'update_edit_data' );

/**
 * Main function to get custom data for modules from db
 *
 * @param unknown $post_id int id of the post_type for which we want to get custom data from db
 *
 * @return array unserialized post meta data from $_POST object
 */
function get_custom_data( $post_id = '' ) {

	// if $post_id is specified we return the $data, else we fill it in the global variable
	$return = true;
	if ( empty( $post_id ) ) {
		global $data;
		global $post_id;
		$return = false;
	}

	$data = get_post_custom( $post_id );
	$unserialized_data = '';

	if ( isset( $data['_page_edit_data'] ) ) {
		$unserialized_data = @unserialize( $data['_page_edit_data'][0] );
	}
	if ( $unserialized_data === false && isset( $data['_page_edit_data_base64'] ) ) {
		$unserialized_data = @unserialize( base64_decode( $data['_page_edit_data_base64'][0] ) );
	}
	if ( $unserialized_data === false ) {
		$unserialized_data = array();
	}

	$data = $unserialized_data;

	if ( $return ) {
		return $data;
	}

}

// we hook after the title on the page edit screen to insert custom HTML with fields for modules
function edit_page( $post ) {
	global $post;
	global $post_id;
	global $data;

	// we need this so we can use the upload media/media selector functionality
	wp_enqueue_style( 'thickbox' );
	wp_enqueue_media();
	wp_enqueue_script( 'thickbox' );

	wp_enqueue_script( 'tinymce-js', includes_url( 'js/tinymce/' ) . 'tinymce.min.js', array( 'jquery' ), THEME_VERSION, true );
	echo '<img alt="autocomplete loader" class="loading-modules" src="'. get_stylesheet_directory_uri() .'/images/autocomplete-loader.gif">';
}
add_filter( 'edit_form_after_title', 'edit_page' );

/**
 * Main function which displays additional modules on page edit screen right after the page title
 *
 */
function get_edit_form() {
	global $post;
	global $post_id;
	global $data;
	global $post_type;
	global $array_of_pages;

	$array_of_pages = get_array_of_pages();

	if ( !empty( $_POST['post_id'] ) ) {
		$post_id = $_POST['post_id'];
	}

	$response = array(
		"modules" => array(),
		"count_modules" => 0,
		"errors" => array(),
		"post_type_show_modules" => 1
	);

	$post_type = $_POST['post_type'];

	$file_type_single_path = get_template_directory() . '/single-' . $post_type . '.php' ;

	if ( ( !file_exists( $file_type_single_path ) && $post_type != 'page' ) || $post_type == 'product' || $post_type == 'shop_order' ) {
		$response["post_type_show_modules"] = 0;
		echo json_encode( $response );
		die();
	}

	$post = get_post( $post_id );
	$data = get_custom_data( $post_id );

	// get modules data (fill it in global variable)
	get_custom_data();

	// get page template name
	$page_template = "";
	// pages
	if ( $post_type == "page" ) {
		if ( !empty( $_POST['page_template'] ) ) {
			$page_template = $_POST['page_template'];
		};
		if ( empty( $page_template ) ) {
			$page_template = get_page_template_slug( $post_id );
			if ( empty( $page_template ) ) {
				$page_template = 'index.php';
			}
		}
	}
	//posts
	else if ( $post_type == "post" ) {
			$page_template = "single-post.php";
		}
	// custom post types
	else {
		$page_template = "single-". $post_type .".php";
	}
	// defaults
	if ( $page_template == 'default' ) {
		$page_template = 'index.php';
	}

	// get modules, set in header of template file
	$file = get_template_directory() . '/' . $page_template;
	$default_headers = array( 'TemplateName' => 'Template Name', 'Modules' => 'Modules' );
	$template_headers = get_file_data( $file, $default_headers );
	$modules = json_decode( $template_headers["Modules"] );
	$modules_output = '';
	$count = 0;

	//If page load template select module by default
	if ( !empty( $post_type ) && $post_type == "page" ) { $modules_output .= select_template_module_form(); }
	//get modules output
	if ( !empty( $modules ) ) {
		foreach ( $modules as $module_object_key => $module ) {

			//get module function name and key/instance ( hero2[0] => function name: hero2, key [0] )
			$splited_object_key = explode( '[', $module_object_key );
			$module_function_name = $splited_object_key[0];
			$module_key = explode( ']', $splited_object_key[1] );
			$module_key = $module_key[0];

			$module_function = $module_function_name. '_module_form';
			$module_name = '';
			$module_params = array();
			$module_id = '';
			$module_visible = '';

			//metabox title
			if ( !empty( $module->name ) ) {
				$module_name = $module->name;
			}
			if ( !empty( $module->params ) ) {
				$module_params = (array)$module->params;
			}
			if ( !empty( $module->id ) ) {
				$module_id = $module->id;
			}
			if ( !empty( $module->visible ) ) {
				$module_visible = $module->visible;
			} else {
				$module_visible = 'all';
			}

			//calling module function
			$modules_output .= $module_function( $module_key , $module_visible, $module_name, $module_params, $module_id );
			$count++;
		}
	}
	$response["modules"] = $modules_output;
	$response["count_modules"] = $count;

	if ( $count == 0 ) {
		$response["error"] = '<br/><br/><br/><br/><p align="center" style="font-size:20px;">NO MODULES APPENDED!</p>';
	}
	else {
		$response["modules"] .= '<input type="hidden" name="whole_edit_screen" id="whole_edit_screen" value="1" />';
	}
//error_log("Debug: Variable value is " . print_r($response["modules"],true));
	echo json_encode( $response );
	die();
}
add_action( 'wp_ajax_get_edit_form', 'get_edit_form' );

/**
 * Main function which displays autocomplete suggestions
 *
 */
add_action( 'wp_ajax_autocomplete_field_function', 'autocomplete_field_function' );

function autocomplete_field_function() {
	global $resources_cpts;

	isset( $_GET['argsautocomplete'] ) ? $args_autocomplete = $_GET['argsautocomplete'] : die();

	isset( $_GET['search'] ) ? $search = $_GET['search'] : die();

	$published_posts = get_posts( unserialize( stripslashes( $args_autocomplete ) ) );

	if ( empty( $published_posts ) ) {
		echo json_encode( array() );
		die();
	}

	$array_of_posts = array();

	foreach ( $published_posts as $published_post ) {
		$obj = get_post_type_object( $published_post->post_type );

		$value = $published_post->ID;
		$text = '<b>' . $published_post->post_title . '</b>';
		$has_post_thumbnail = has_post_thumbnail( $published_post->ID );
		$html = '';
		$html .= '<div class="left-floater img-wrapper">';
		if ( $has_post_thumbnail ) {
			$html .= get_the_post_thumbnail( $published_post->ID, array( 60, 60 ) );
		} else {
			$html .= '<img src="http://placehold.it/60x60?text=' . ucfirst( $obj->labels->singular_name )  . '">';
		}
		$html .= '</div>';
		$html .= '<div class="left-floater">';
		$html .=  $text;
		$html .=  '<br><i class="tokenize-text-row">Type:</i> <i class="tokenize-text-row">' . ucfirst( $obj->labels->singular_name ) . '</i>';
		$text .= ' <span class="marker-label">(' . ucfirst( $obj->labels->singular_name )  . ')</span>';
		$taxonomies = get_object_taxonomies( $published_post, 'objects' );
		// var_dumpp($taxonomies);
		if ( count( $taxonomies ) > 0 ) {
			foreach ( $taxonomies as $taxonomy_id => $taxonomy ) {
				$term_list = wp_get_post_terms( $published_post->ID, $taxonomy_id, array( "fields" => "names" ) );
				if ( count( $term_list ) > 0 ) {
					$html .= '<br><i class="tokenize-text-row">' . $taxonomy->label . ':</i>';
					foreach ( $term_list as $term ) {
						$html .= ' <i class="tokenize-text-tag" style="font-weight:bold;font-size:9px;background-color:#f0f0f0; padding:1px 2px;border-radius:2px;">' . $term . '</i> ';
					}
				}
			}
		}

		if ( $published_post->post_type == 'life_stage' ) {
			$life_stage_type = get_post_meta( $published_post->ID, "_wp_page_template", true );
			if ( $life_stage_type =='life_experience' ) {
				$html .=  '<br><i class="tokenize-text-row">Subtype:</i> <i class="tokenize-text-row">Life Experience</i>';
			}
		}

		if ( $published_post->post_type == 'program' ) {
			$checkbox_value = get_post_meta( $published_post->ID, "meta-box-checkbox", true );
			$html .= '<br><i class="tokenize-text-row">Hidden on balancepro.org:</i> <i style="font-size: 13px;font-style: normal;width: auto;height: 13px;line-height: 13px;vertical-align: middle;" class="dashicons dashicons-' . ( $checkbox_value == 'true' ? 'yes' : 'no' ) . '"></i>';
		}

		if ( in_array( $published_post->post_type, $resources_cpts ) ) {
			$access_level = get_post_meta( $published_post->ID, "access_level", true );
			$html .= '<br><i class="tokenize-text-row">Access Level:</i> <i style="font-size:9px;">' . ( $access_level == '100' ? 'Non registered users' : 'Registered Users' ) . '</i>';
			$list_in_search = get_post_meta( $published_post->ID, "list_in_search", true );
			$html .= '<br><i class="tokenize-text-row">List In Search:</i> <i style="font-size:9px;">' . ( $list_in_search == 'true' ? 'Yes' : 'No' ) . '</i>';
		}

		if ( strlen( $published_post->post_excerpt ) > 0 ) {
			$html .= '<br><i class="tokenize-text-row">Excerpt:</i> <i style="font-size:9px;">' . $published_post->post_excerpt . '</i>';
		}

		if ( $published_post->post_type == 'page' ) {
			$current_template = get_page_template_slug( $published_post->ID );
			$available_templates = get_page_templates();
			$used_template = '';
			foreach ( $available_templates as $key => $template ) {
				if ( $template == $current_template ) {
					$used_template = $key . ' Template';
				} else if ( $current_template == '' ) {
						$used_template = 'Default Template';
						break;
					}
			}
			$html .= '<br><i style="font-size:9px; font-style:normal">Template:</i> <i style="font-size:9px;">' . $used_template . '</i>';
		}

		$html .= '<br><i class="tokenize-text-row">Published on:</i> <i style="font-size:9px;">' . $published_post->post_date . '</i>';

		$permalink = get_permalink( $published_post->ID );
		$edit_link = get_edit_post_link( $published_post->ID );
		if ( strlen( $permalink ) > 0 && strlen( $edit_link ) > 0  ) {
			$html .=  '<br>';
			$html .=  '<i style="font-size:9px;"><a href="' . $permalink . '" target="_blank">View</a></i>';
			$html .=  '&nbsp;<i style="font-size:9px;"><a href="' . $edit_link . '" target="_blank">Edit</a></i>';
		}
		$html .= '</div>';

		$array_of_posts[] = array(
			"value" => $value,
			"text" => $text,
			"html" => $html
			// 'permalink' => get_permalink( $published_post->ID )
		);

	}

	echo json_encode( $array_of_posts );
	die();
}
?>
