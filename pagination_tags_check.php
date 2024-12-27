<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// SET HEADER
header("Content-Type: application/json; charset=UTF-8");

// INCLUDING DATABASE AND MAKING OBJECT
include('../db/database.php');
// MAKE SQL QUERY
$personData = json_decode($_REQUEST['data']);
$dvaluen = $personData->dvalue;
$page = $personData->page;
$tagid = $personData->tagid;
$resourcetypes = $personData->rtypes;
//$dvalue = $personData->dvalue;
$keywords= explode(',', $tagid);
$advancedkeywords = implode("', '", $keywords);
$lifestage = $personData->lifestage;
$search = $personData->search;
$searchQuery = str_replace('\\', "", $search);
$unquotedQuery = str_replace('"', "", $search);
$sort =  $personData->sort;
if(empty($sort)){
    $sort = '0' ;  
}
if(empty($search)){
    $search = '0' ;  
}
if(empty($resourcetypes)  or $resourcetypes == '' ){
    $resourcetypes = '0' ;  
}
if(empty($tagid)){
    $tagid = '0' ;  
}

$limit = 9;
if($page){
    $start = ($page - 1) * $limit; 
    $newpage = $page;
}else{
    $start = 0; 
    $newpage = 1;
}
if(empty($page)  or $page == '' ){
    $page = '0' ;  
}
$list = 'true';
$level = '100';
$pgorder = '1';
$resources = 'resources/';

if($search == '0'){
// if search is 0 starts
    if($sort == '0'){
        $select = "SELECT DISTINCT  w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id";
        $from = " FROM wp_resources as w, wp_posts AS P";
        $where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100'";
        if($resourcetypes != '0'){
            $where .= " and w.type = '$resourcetypes'";
            $where .= " and P.post_type = '$resourcetypes'";
        }
        if($lifestage !== '0'){
            //if($resourcetypes != "Worksheet"){
            $from .=", life_stage_type AS l";
            $where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
        /*} else {
            $from .=", life_stage_type AS l";
            $where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.wp_post_id";            
        }*/
        }
        if($tagid != '0'){
            $from .= " , wp_term_relationships as wtr ";
            $where .= " AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
        }
        $order = " AND w.page_order = '$pgorder'";
        //$limit = 'limt 0, 9';
        $query = $select . $from . $where . $order ;
        //echo $query; 
        $checkn = $db->prepare($query);
    } else if ($sort == 'relevance'){
        $select = "SELECT DISTINCT  w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id";
        $from = " FROM wp_resources as w, wp_posts AS P";
        $where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100'";
        if($resourcetypes != '0'){
            $where .= " and w.type = '$resourcetypes'";
            $where .= " and P.post_type = '$resourcetypes'";
        }
        if($lifestage !== '0'){
          //  if($resourcetypes != "Worksheet"){
            $from .=", life_stage_type AS l";
            $where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
        /*} else {
            $from .=", life_stage_type AS l";
            $where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.wp_post_id";
        }*/
        }
        if($tagid != '0'){
            $from .= " , wp_term_relationships as wtr  ";
            $where .= " AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
        }
        $order = " AND w.page_order = '$pgorder'";
        //$limit = 'limt 0, 9';
        $query = $select . $from . $where . $order ;
        //echo $query; 
        $checkn = $db->prepare($query);
    }else if ($sort == 'views'){
        $select = "SELECT DISTINCT  w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id, wc.view_count";
        $from = " FROM wp_resources as w, wp_posts AS P , wp_resources_view_count as wc";
        $where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' AND  wc.wp_post_id = w.wp_post_id AND w.page_order = '$pgorder' ";
        if($resourcetypes != '0'){
            $where .= " and w.type = '$resourcetypes'";
            $where .= " and P.post_type = '$resourcetypes'";
        }
        if($lifestage !== '0'){
            $from .=", life_stage_type AS l";
            $where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
        }
        if($tagid != '0'){
            $from .= " , wp_term_relationships as wtr ";
            $where .= " AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
        }
        $order = "  ORDER BY wc.view_count DESC ";
        //$limit = 'limt 0, 9';
        $query = $select . $from . $where . $order ;
        //echo $query; 
        $checkn = $db->prepare($query);
    }else if ($sort == 'date'){
        $select = "SELECT DISTINCT  w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id, P.post_date_gmt";
        $from = " FROM wp_resources as w, wp_posts AS P";
        $where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' AND w.page_order = '$pgorder'";
        if($resourcetypes != '0'){
            $where .= " and w.type = '$resourcetypes'";
            $where .= " and P.post_type = '$resourcetypes'";
        }
        if($lifestage !== '0'){
            $from .=", life_stage_type AS l";
            $where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
        }
        if($tagid != '0'){
            $from .= " , wp_term_relationships as wtr ";
            $where .= " AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
        }
        $order = " ORDER BY P.post_date_gmt DESC ";
        //$limit = 'limt 0, 9';
        $query = $select . $from . $where . $order ;
        //echo $query; 
        $checkn = $db->prepare($query);
    }
// if search is 0 ends
} else {
// if search has value starts
    if($sort == '0'){
        $select = "SELECT DISTINCT (w.title = '{$unquotedQuery}') AS title_match, match (w.html, w.title) against ('{$searchQuery}') AS relevancy, (w.post_title LIKE '%{$unquotedQuery}%') AS title_rough_match, w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id";
        $from = " FROM wp_resources as w, wp_posts AS P";
        $where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100'";
        if ($searchQuery != '') {
            $where .= " and (match (w.html, w.title) against ('{$searchQuery}' in boolean mode) or match (P.post_excerpt) against ('{$searchQuery}' in boolean mode))";
        }
        if($resourcetypes != '0'){
            $where .= " and w.type = '$resourcetypes'";
            $where .= " and P.post_type = '$resourcetypes'";
        }
        if($lifestage !== '0'){
            $from .=", life_stage_type AS l";
            $where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
        }
        if($tagid !='0'){
            $from .= " , wp_term_relationships as wtr  ";
            $where .= " AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
        }
        $order = " AND w.page_order = '$pgorder' ";
        //$limit = 'limt 0, 9';
        $query = $select . $from . $where . $order ;
        //echo $query;
        $checkn = $db->prepare($query);
    } else if ($sort == 'relevance'){
        $select = "SELECT DISTINCT (w.title = '{$unquotedQuery}') AS title_match, match (w.html, w.title) against ('{$searchQuery}') AS relevancy, (w.post_title LIKE '%{$unquotedQuery}%') AS title_rough_match, w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id";
        $from = " FROM wp_resources as w, wp_posts AS P";
        $where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100'";
        if ($searchQuery != '') {
            $where .= " and (match (w.html, w.title) against ('{$searchQuery}' in boolean mode) or match (P.post_excerpt) against ('{$searchQuery}' in boolean mode))";
        }
        if($resourcetypes != '0'){
            $where .= " and w.type = '$resourcetypes'";
            $where .= " and P.post_type = '$resourcetypes'";
        } 
        if($lifestage !== '0'){
            $from .=", life_stage_type AS l";
            $where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
        }
        if($tagid !='0'){
            $from .= " , wp_term_relationships as wtr ";
            $where .= " AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
        }
            $order = " AND w.page_order = '$pgorder' ";
            //$limit = 'limt 0, 9';
            $query = $select . $from . $where . $order ;
            $checkn = $db->prepare($query);
    }else if ($sort == 'views'){
        $select = "SELECT DISTINCT (w.title = '{$unquotedQuery}') AS title_match, match (w.html, w.title) against ('{$searchQuery}') AS relevancy, (w.post_title LIKE '%{$unquotedQuery}%') AS title_rough_match, w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id, wc.view_count";
        $from = " FROM wp_resources as w, wp_posts AS P , wp_resources_view_count as wc ";
        $where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' AND  wc.wp_post_id = w.wp_post_id AND w.page_order = '$pgorder' ";
        if ($searchQuery != '') {
             $where .= " and (match (w.html, w.title) against ('{$searchQuery}' in boolean mode) or match (P.post_excerpt) against ('{$searchQuery}' in boolean mode))";
        }
        if($resourcetypes != '0'){
            $where .= " and w.type = '$resourcetypes'";
            $where .= " and P.post_type = '$resourcetypes'";
        }
        if($lifestage !== '0'){
            $from .=", life_stage_type AS l";
            $where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
        }
        if($tagid !='0'){
            $from .= " , wp_term_relationships as wtr ";
            $where .= " AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
        }
        $order = "  ORDER BY wc.view_count DESC  ";
        //$limit = 'limt 0, 9';
        $query = $select . $from . $where . $order ;
        $checkn = $db->prepare($query);
    }else if ($sort == 'date'){
        $select = "SELECT DISTINCT (w.title = '{$unquotedQuery}') AS title_match, match (w.html, w.title) against ('{$searchQuery}') AS relevancy, (w.post_title LIKE '%{$unquotedQuery}%') AS title_rough_match, w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id, P.post_date_gmt";
        $from = " FROM wp_resources as w, wp_posts AS P";
        $where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' AND w.page_order = '$pgorder'";
        if ($searchQuery != '') {
            $where .= " and (match (w.html, w.title) against ('{$searchQuery}' in boolean mode) or match (P.post_excerpt) against ('{$searchQuery}' in boolean mode))";
        }
        if($resourcetypes != '0'){
            $where .= " and w.type = '$resourcetypes'";
            $where .= " and P.post_type = '$resourcetypes'";
        }
        if($lifestage !== '0'){
            $from .=", life_stage_type AS l";
            $where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
        }
        if($tagid !='0'){
            $from .= " , wp_term_relationships as wtr ";
            $where .= " AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
         }
        $order = " ORDER BY P.post_date_gmt DESC  ";
        //$limit = 'limt 0, 9';
        $query = $select . $from . $where . $order ;
        $checkn = $db->prepare($query);
    }
// if search has value ends
}


$checkn->execute();

//$checkcount = $check->rowCount();
//now count row 
$checkcountn = $checkn->rowCount();

$totalpages = ceil( $checkcountn / $limit );
$ttvalue = 'tags';
$output = '';
//$output = $newpage.'--this is new page--this is total page'.$totalpages;  
$output .='<nav aria-label="balance pager m14-m15" balance-pager="" class="paging-holder clear">
<ul class="pagination">';
if ($pvalue > 1) {
	if($totalpages != 1){
		$output = '';

		$output .= '<nav aria-label="balance pager m14-m15" balance-pager="" class="paging-holder clear">
		<ul class="pagination">';
		
		if ($totalpages > 1) {
			// Previous Page Button
			if ($pvalue > 1) {
				$output .= '<li>
				<div class="search-prv-click" query="' . $searchvalue . '" pager="' . ($pvalue - 1) . '" aria-label="Previous" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" sort="' . $sort . '">
					<div style="float: left; margin-top:4px; margin-left:4px; cursor: pointer;">
						<span class="btn-prev"></span>
					</div>
				</div>
				</li>';
			}
		
			// Ensure pvalue is set correctly
			if (empty($pvalue) || $pvalue == '' || $pvalue == 0 || $pvalue == '0') {
				$pvalue = 1;
			}
		
			// Case 1: Total pages is 1
			if ($totalpages == 1) {
				$output .= '<li class="active" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: #6BD9DE; color: #fff;" totalpages="' . $totalpages . '" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="1" sort="' . $sort . '">1</li>';
			} 
			// Case 2: Total pages is less than or equal to 6
			else if ($totalpages <= 6) {
				if ($pvalue > 2) {
					// Always show the first page
					$output .= '<li class="pg-btn-search" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: #fff; color: #000;" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="1" sort="' . $sort . '">1</li>';
					// Add ellipsis if not on the first two pages
					if ($pvalue > 3) {
						$output .= '<li class="disabled" style="padding:0px 5px; font-size:22px; position:relative; bottom:5px; color:#6BD9DE;">..</li>';
					}
				}
		
				// Show the actual range of pages
				for ($i = max(1, $pvalue - 1); $i <= min($totalpages, $pvalue + 1); $i++) {
					$output .= '<li class="pg-btn-search ' . ($pvalue == $i ? 'active' : '') . '" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: ' . ($pvalue == $i ? '#6BD9DE' : '#fff') . '; color: ' . ($pvalue == $i ? '#fff' : '#000') . ';" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="' . $i . '" sort="' . $sort . '">' . $i . '</li>';
				}
		
				if ($pvalue < $totalpages - 1) {
					// Add ellipsis if not on the last two pages
					if ($pvalue < $totalpages - 2) {
						$output .= '<li class="disabled" style="padding:0px 5px; font-size:22px; position:relative; bottom:5px; color:#6BD9DE;">..</li>';
					}
					// Always show the last page
					$output .= '<li class="pg-btn-search" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: #fff; color: #000;" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="' . $totalpages . '" sort="' . $sort . '">' . $totalpages . '</li>';
				}
			} 
			// Case 3: Total pages is greater than 6
			else {
				// Always show the first page
				$output .= '<li class="pg-btn-search" style="padding:0px 5px; border-radius: 5px; cursor: pointer;" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="1" sort="' . $sort . '">1</li>';
		
				// Add ellipsis if the current page is greater than 4
				if ($pvalue > 4) {
					$output .= '<li class="disabled" style="padding:0px 5px; font-size:22px; position:relative; bottom:5px; color:#6BD9DE;">..</li>'; // Ellipsis
				}
		
				// Show pages around the current page
				$start = max(2, $pvalue - 1); // One page before current
				$end = min($totalpages - 1, $pvalue + 1); // One page after current
				for ($i = $start; $i <= $end; $i++) {
					$output .= '<li class="pg-btn-search ' . ($pvalue == $i ? 'active' : '') . '" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: ' . ($pvalue == $i ? '#6BD9DE' : '#fff') . '; color: ' . ($pvalue == $i ? '#fff' : '#000') . ';" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="' . $i . '" sort="' . $sort . '">' . $i . '</li>';
				}
		
				// Add ellipsis if there are more pages after the displayed range
				if ($pvalue < $totalpages - 2) {
					$output .= '<li class="disabled" style="padding:0px 5px; font-size:22px; position:relative; bottom:5px; color:#6BD9DE;">..</li>'; // Ellipsis
				}
		
				// Always show the last page
				$output .= '<li class="pg-btn-search" style="padding:0px 5px; border-radius: 5px; cursor: pointer;" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="' . $totalpages . '" sort="' . $sort . '">' . $totalpages . '</li>';
			}
		
			// Next Page Button
			if ($pvalue < $totalpages) {
				$output .= '<li>
				<div class="search-nxt-click" query="' . $searchvalue . '" pager="' . ($pvalue + 1) . '" aria-label="Next" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" sort="' . $sort . '">
					<div style="float: left; margin-top:4px; margin-right:4px; cursor: pointer;">
						<span class="btn-next"></span>
					</div>
				</div>
				</li>';
			}
		}
		
		$output .= '</ul></nav>';
	}
	}
	else{
//for ($i=1; $i <= min($totalpages,10); $i++) {


if ($totalpages > 1) {
    // Previous Page Button
    if ($pvalue > 1) {
        $output .= '<li style="padding-top: 4px; padding-left: 17px;">
        <div class="search-prv-click" query="' . $searchvalue . '" pager="' . ($pvalue - 1) . '" aria-label="Previous" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" sort="' . $sort . '">
            <div style="float: left; margin-top:4px; margin-left:4px; cursor: pointer;">
                <span class="btn-prev"></span>
            </div>
        </div>
        </li>';
    }

    // Ensure pvalue is set correctly
    if (empty($pvalue) || $pvalue == '' || $pvalue == 0 || $pvalue == '0') {
        $pvalue = 1;
    }

    // Case 1: Total pages is 1
    if ($totalpages == 1) {
        $output .= '<li class="active" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: #6BD9DE; color: #fff;" totalpages="' . $totalpages . '" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="1" sort="' . $sort . '">1</li>';
    } 
    // Case 2: Total pages is less than or equal to 6
    else if ($totalpages <= 6) {
        if ($pvalue > 2) {
            // Always show the first page
            $output .= '<li class="pg-btn-search" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: #fff; color: #000;" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="1" sort="' . $sort . '">1</li>';
            // Add ellipsis if not on the first two pages
            if ($pvalue > 3) {
                $output .= '<li class="disabled" style="padding:0px 5px; font-size:22px; position:relative; bottom:5px; color:#6BD9DE;">..</li>';
            }
        }

        // Show the actual range of pages
        for ($i = max(1, $pvalue - 1); $i <= min($totalpages, $pvalue + 1); $i++) {
            $output .= '<li class="pg-btn-search ' . ($pvalue == $i ? 'active' : '') . '" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: ' . ($pvalue == $i ? '#6BD9DE' : '#fff') . '; color: ' . ($pvalue == $i ? '#fff' : '#000') . ';" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="' . $i . '" sort="' . $sort . '">' . $i . '</li>';
        }

        if ($pvalue < $totalpages - 1) {
            // Add ellipsis if not on the last two pages
            if ($pvalue < $totalpages - 2) {
                $output .= '<li class="disabled" style="padding:0px 5px; font-size:22px; position:relative; bottom:5px; color:#6BD9DE;">..</li>';
            }
            // Always show the last page
            $output .= '<li class="pg-btn-search" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: #fff; color: #000;" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="' . $totalpages . '" sort="' . $sort . '">' . $totalpages . '</li>';
        }
    } 
    // Case 3: Total pages is greater than 6
    else {
        // Always show the first page
        $output .= '<li class="pg-btn-search" style="padding:0px 5px; border-radius: 5px; cursor: pointer;" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="1" sort="' . $sort . '">1</li>';

        // Add ellipsis if the current page is greater than 4
        if ($pvalue > 4) {
            $output .= '<li class="disabled" style="padding:0px 5px; font-size:22px; position:relative; bottom:5px; color:#6BD9DE;">..</li>'; // Ellipsis
        }

        // Show pages around the current page
        $start = max(2, $pvalue - 1); // One page before current
        $end = min($totalpages - 1, $pvalue + 1); // One page after current
        for ($i = $start; $i <= $end; $i++) {
            $output .= '<li class="pg-btn-search ' . ($pvalue == $i ? 'active' : '') . '" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: ' . ($pvalue == $i ? '#6BD9DE' : '#fff') . '; color: ' . ($pvalue == $i ? '#fff' : '#000') . ';" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="' . $i . '" sort="' . $sort . '">' . $i . '</li>';
        }

        // Add ellipsis if there are more pages after the displayed range
        if ($pvalue < $totalpages - 2) {
            $output .= '<li class="disabled" style="padding:0px 5px; font-size:22px; position:relative; bottom:5px; color:#6BD9DE;">..</li>'; // Ellipsis
        }

        // Always show the last page
        $output .= '<li class="pg-btn-search" style="padding:0px 5px; border-radius: 5px; cursor: pointer;" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="' . $totalpages . '" sort="' . $sort . '">' . $totalpages . '</li>';
    }

    // Next Page Button
    if ($pvalue < $totalpages) {
        $output .= '<li >
        <div class="search-nxt-click" query="' . $searchvalue . '" pager="' . ($pvalue + 1) . '" aria-label="Next" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" sort="' . $sort . '">
            <div style="float: left; margin-top:4px; margin-right:4px; cursor: pointer;">
                <span class="btn-next"></span>
            </div>
        </div>
        </li>';
    }
}

$output .= '</ul></nav>';
	}
$return_arr['message'] = $output;
echo json_encode($return_arr);
?>