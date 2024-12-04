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
$rtypes = $personData->dvalue;
$page = $personData->pager;
$lifestage = $personData->lifestage;
$search = $personData->search;
$searchQuery = str_replace('\\', "", $search);
$unquotedQuery = str_replace('"', "", $search);
$limit = 9;
if($page){
    $start = ($page - 1) * $limit; 
}else{
    $start = 0; 
}  
$list = 'true';
$level = '100';
$pgorder = '1';
$resources = 'resources/';

$check = '0';
if($search == ''){
	$searchvalue = '0';
}else{
	$searchvalue = $search;
}
//we have life stage cat id and resource type category
 if($lifestage == '0' AND $searchvalue != '0' AND $rtypes == '0'){
	// echo " line 33..." . $lifestage ." -> lifestage ". $search ." -> search ". $rtypes  ." -> rtypes "; 

    $select = "SELECT (w.title = '{$unquotedQuery}') AS title_match, match (w.html, w.title) against ('{$searchQuery}') AS relevancy, (w.post_title LIKE '%{$unquotedQuery}%') AS title_rough_match, w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id";
    $from = " FROM wp_resources as w, wp_posts AS P";
    $where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100'";
    if ($searchQuery != '') {
    $where .= " and (match (w.html, w.title) against ('{$searchQuery}' in boolean mode) or match (P.post_excerpt) against ('{$searchQuery}' in boolean mode))";
    }
    
    $order = " order by title_match desc, title_rough_match desc, relevancy desc";
    $query = $select . $from . $where . $order;
    $checkn = $db->prepare($query);
} else 
if($lifestage != '0' AND $searchvalue == '0' AND $rtypes == '0'){
    $select = "SELECT  w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id";
    $from = " FROM wp_resources as w, wp_posts AS P";
    $where = " WHERE  w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100'";
    
    if($lifestage !== '0'){
		$from .=", life_stage_type AS l";
        $where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
    }
    $order = " AND w.page_order = '$pgorder' ";
    $query = $select . $from . $where . $order;
    $checkn = $db->prepare($query);


} else if($lifestage == '0' AND $searchvalue == '0' AND $rtypes == '0'){
	$checkn = $db->prepare("SELECT * FROM wp_resources WHERE level_of_access = '$level' AND list_in_search = '$list' AND page_order = '$pgorder'");

} else 

if($searchvalue !== '0'){
	// echo " line 44..";
 $select = "SELECT (w.title = '{$unquotedQuery}') AS title_match, match (w.html, w.title) against ('{$searchQuery}') AS relevancy, (w.post_title LIKE '%{$unquotedQuery}%') AS title_rough_match, w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id";
 $from = " FROM wp_resources as w, wp_posts AS P";
 $where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100'";
 if ($searchQuery != '') {
 $where .= " and (match (w.html, w.title) against ('{$searchQuery}' in boolean mode) or match (P.post_excerpt) against ('{$searchQuery}' in boolean mode))";
 }
 if($rtypes != '0'){
	
	 $where .= " and w.type = '$rtypes'";
	 $where .= " and P.post_type = '$rtypes'";
 }

 if($lifestage !== '0'){
	 $from .=", life_stage_type AS l";
	 $where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
 }
 $order = " order by title_match desc, title_rough_match desc, relevancy desc";
 //$limit = 'limt 0, 9';
 $query = $select . $from . $where . $order . $limit;
 $result = $db->prepare($query);
 $query1 = $select . $from . $where . $order ;
 $checkn = $db->prepare($query1);

} else if ($searchvalue == '0'){
	// echo " line 68..";
	 $select = "SELECT  w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id";
	 $from = " FROM wp_resources as w, wp_posts AS P";
	 $where = " WHERE P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100'";
	 
	 if($rtypes != '0'){
		 $where .= " and w.type = '$rtypes'";
		 
		 $where .= " and P.post_type = '$rtypes'";
		 
	 }
	
	 if($lifestage !== '0'){
				 $from .=", life_stage_type AS l";
		 $where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
	 }
	 $order = " AND w.page_order = '$pgorder'";
	 //$limit = 'limt 0, 9';
	 $query = $select . $from . $where . $order . $limit;
	 
 $result = $db->prepare($query);
 $query1 = $select . $from . $where . $order ;
 $checkn = $db->prepare($query1);
} else 
if($lifestage == '0' AND $searchvalue == '0' AND $rtypes == '0'){
	$query = "SELECT * FROM wp_resources WHERE level_of_access = '$level' AND list_in_search = '$list' AND page_order = '$pgorder'";
    $checkn = $db->prepare($query);
}else if($lifestage == '0' AND $searchvalue == '0'AND $rtypes != '0'){
    // life stage is 0 and search is 0 starts
//	echo " line 42....";
   $checkn = $db->prepare("SELECT * FROM wp_resources WHERE type = '$rtypes' AND level_of_access = '$level' AND list_in_search = '$list' AND page_order = '$pgorder'");
    // life stage is 0 and search is 0 ends
}else if($lifestage != '0' AND $searchvalue == '0'){
    // life stage is 'some value' and search is 0 starts
    $checkn = $db->prepare("SELECT l.postid, l.lifestagetype, w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id 
    FROM life_stage_type AS l, wp_resources AS w
    WHERE l.lifestagetype = '$lifestage' AND l.postid = w.ID AND w.type = '$rtypes'"); 
    // life stage is 'some value' and search is 0 ends
}else if($lifestage == '0' AND $searchvalue != '0'){
    // life stage is 0 and search is 'some value' starts
   $checkn = $db->prepare("SELECT (w.title = '{$unquotedQuery}') AS title_match, match (w.html, w.title) against ('{$searchQuery}') AS relevancy, (w.post_title LIKE '%{$unquotedQuery}%') AS title_rough_match, w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id FROM wp_resources as w, wp_posts AS P WHERE w.type = '$rtypes' AND w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' and (match (w.html, w.title) against ('{$searchQuery}' in boolean mode) or match (P.post_excerpt) against ('{$searchQuery}' in boolean mode)) order by title_match DESC, title_rough_match desc, relevancy desc");
   //echo 'im reached here';
   //$return_arr['query'] = $stmt;
    // life stage is 0 and search is 'some value' ends
}else if($lifestage != '0' AND $searchvalue != '0'){
    // life stage is 'some value' and search is 'some value' starts
    $checkn = $db->prepare("SELECT l.postid, l.lifestagetype, w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id, (w.title = '{$unquotedQuery}') AS title_match 
    FROM life_stage_type AS l, wp_resources AS w
    WHERE title LIKE '%{$unquotedQuery}%' AND l.lifestagetype = '$lifestage' AND l.postid = w.ID AND w.type = '$rtypes' AND status = 'publish' AND list_in_search = 'true' AND level_of_access = '100' order by title_match DESC");  
    // life stage is 0 and search is 'some value' ends
}else{}
//check 
$checkn->execute();
//now count row 
$checkcountn = $checkn->rowCount();
//$return_arr['Query'] = $checkn;
$totalpages = ceil( $checkcountn / $limit );
$output = '';
$output .= '<nav aria-label="balance pager m14-m15" balance-pager="" class="paging-holder clear" totalcheckcount="'.$checkcountn.'" totalpages="'.$totalpages.'">
    <ul class="pagination">';

if (empty($page) || $page == '' || $page == 0 || $page == '0') {
    $page = 1;
}

// Display "previous" button if not on the first page
if ($page > 1) {
    $output .= '<li>
	<div class="prv-btn" lifestage="'.$lifestage.'" type="'.$rtypes.'" pager="'.($page-1).'"  search="'.$searchvalue.'"  sort="'.$sort.'">
        <div style="float: left;   cursor: pointer;">
        <span class="btn-prev"></span>
    </div>
    <div style="float: left;  cursor: pointer; ">
        <span class="hidden-xs"></span>
    </div>  
        </div>
    </li>';
}

// Display page numbers with ellipsis logic
$maxPagesToShow = 5; // Total number of pages to show at once, including ellipsis

if ($totalpages > $maxPagesToShow) {
    // Display the first page
    $output .= '<li class="pg-btn '.($page == 1 ? 'active' : '').'" style="padding:5px 6px; font-size: 16px ; cursor: pointer;" lifestage="'.$lifestage.'" typevalue="'.$rtypes.'" pagerv="1" search="'.$searchvalue.'" sort="'.$sort.'">1</li>';

    if ($page > 4) {
        $output .= '<li class="pg-btn disabled" style="cursor: default; color: #6BD9DE">...</li>';
    }

    // Display the range of pages around the current page
    $start = max(2, $page - 2);
    $end = min($totalpages - 1, $page + 2);
    for ($i = $start; $i <= $end; $i++) {
        $output .= '<li class="pg-btn '.($page == $i ? 'active' : '').'" style="padding:5px 6px; font-size: 16px ; cursor: pointer;" lifestage="'.$lifestage.'" typevalue="'.$rtypes.'" pagerv="'.$i.'" search="'.$searchvalue.'" sort="'.$sort.'">'.$i.'</li>';
    }

    if ($page < $totalpages - 3) {
        $output .= '<li class="pg-btn disabled" style="cursor: default; color: #6BD9DE">...</li>';
    }

    // Display the last page
    $output .= '<li class="pg-btn '.($page == $totalpages ? 'active' : '').'" style="padding:5px 6px; font-size: 16px ; cursor: pointer;" lifestage="'.$lifestage.'" typevalue="'.$rtypes.'" pagerv="'.$totalpages.'" search="'.$searchvalue.'" sort="'.$sort.'">'.$totalpages.'</li>';
} else {
    // Display all pages if the total number is less than or equal to the max to show
    for ($i = 1; $i <= $totalpages; $i++) {
        $output .= '<li class="pg-btn '.($page == $i ? 'active' : '').'" style="padding:5px 6px; font-size: 16px ; cursor: pointer;" lifestage="'.$lifestage.'" typevalue="'.$rtypes.'" pagerv="'.$i.'" search="'.$searchvalue.'" sort="'.$sort.'">'.$i.'</li>';
    }
}

// Display "next" button if not on the last page
if ($page < $totalpages) {
    $output .= '<li>
        <div class="next-btn" search="'.$searchvalue.'" sort="'.$sort.'" lifestage="'.$lifestage.'" type="'.$rtypes.'" pager="'.($page + 1).'">
            <div style="float: left;   cursor: pointer;  align-items: center;">
        <span class="hidden-xs"></span>
    </div>
    <div style="float: left;  cursor: pointer; align-items: center;">
        <span class="btn-next"></span>
    </div>
        </div>
    </li>';
}

$output .= '</ul>';
$output .= '</nav>';
								
	$return_arr['message'] = $output;
	echo json_encode($return_arr);
?>