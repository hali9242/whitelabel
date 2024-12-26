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
$resourcetypes = $personData->resourcetypes;
$lifestage = $personData->lifestage;

$newsearch='';
if(strpos($dvaluen ,'(' )!='' &&  strpos($dvaluen ,')') ==''){
	$searchx = explode('(',$dvaluen);
	$newsearch = trim($searchx[0]);	
}
else if(strpos($dvaluen ,'(' )!='' &&  strpos($dvaluen ,')') !=''){
$dvaluen = trim(preg_replace('/\s*\([^)]*\)/', '', $dvaluen));
}
if($newsearch!=''){
	$dvaluen=$newsearch;
}

$searchQuery = str_replace('\\', "", $dvaluen);
$searchQuery = str_replace("'", "", $searchQuery);
$searchQuery = preg_replace('/[#\@\.\*\%\;\$\&\^]+-/', '', $searchQuery);

$unquotedQuery = str_replace('"', "", $dvaluen);
$unquotedQuery = str_replace("'", "", $unquotedQuery);
$unquotedQuery = preg_replace('/[#\@\.\*\%\;\$\&\^]+-/', '', $unquotedQuery);
   
$return_arr = array();
$sort =  $personData->sort;
if(empty($sort)  ){
    $sort = '0' ;  
}
if($page){
	$pvalue = $page;
}else{
	$pvalue = '0';
}
//echo $pvalue;
$limit = 9;
if($page){
    $start = ($pvalue - 1) * $limit; 
}else{
    $start = 0; 
}
$tags = $personData->tags;
if(empty($tags) or $tags == "" ){
	$tags = '0'	;
}
$keywords= explode(',', $tags);
$advancedkeywords = implode("', '", $keywords);
if(empty($tags) or $tags == "" ){
	$tags = '0'	;
}
$list = 'true';
$level = '100';
$pgorder = '1';
$limit = ' limit 9';
if($dvaluen == ''){
	$searchvalue = '0';
}else{
	$searchvalue = $dvaluen;
}
//$return_arr['dvalue']=$_POST['data'];
if($lifestage == '0' AND $searchvalue == '0' AND $resourcetypes == '0'){
// if search is 0 and life stage is 0 and resourcetype is 0 starts
	if($sort == '0'){
//$return_arr['inptu']="1";
		if($tags !='0'){
			$result = $db->prepare("SELECT Distinct * FROM wp_resources as w, wp_term_relationships as wtr WHERE w.status = 'publish' AND w.level_of_access = '$level' AND w.list_in_search = '$list'  AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords')  AND w.page_order = '$pgorder'");
		} else {
			$result = $db->prepare("SELECT Distinct * FROM wp_resources WHERE status = 'publish' AND level_of_access = '$level' AND list_in_search = '$list' AND page_order = '$pgorder'");
		}
		
	} else if($sort == 'relevance'){
//$return_arr['inptu']="2";

		
		if($tags !='0'){
			$result = $db->prepare("SELECT Distinct * FROM wp_resources as w, wp_term_relationships as wtr WHERE w.status = 'publish' AND w.level_of_access = '$level' AND w.list_in_search = '$list'  AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') AND w.page_order = '$pgorder'");
		} else {
			$result = $db->prepare("SELECT Distinct * FROM wp_resources WHERE status = 'publish' AND level_of_access = '$level' AND list_in_search = '$list' AND page_order = '$pgorder'");
		}
	} else if($sort == 'views'){
//$return_arr['inptu']="3";

	
		if($tags !='0'){
			$result = $db->prepare("SELECT Distinct * FROM wp_resources as w, wp_resources_view_count as wc , wp_term_relationships as wtr WHERE w.status = 'publish' AND w.level_of_access = '$level' AND w.list_in_search = '$list' AND  wc.wp_post_id = w.wp_post_id   AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ORDER BY wc.view_count DESC ");
		} else {
			$result = $db->prepare("SELECT Distinct * FROM wp_resources as w, wp_resources_view_count as wc WHERE w.status = 'publish' AND w.level_of_access = '$level' AND w.list_in_search = '$list' AND  wc.wp_post_id = w.wp_post_id  ORDER BY wc.view_count DESC ");
		}
	} else if($sort == 'date'){
//$return_arr['inptu']="4";

		if($tags !='0'){
			$result = $db->prepare("SELECT Distinct * FROM wp_resources as w, wp_posts AS P, wp_term_relationships as wtr WHERE w.status = 'publish' AND w.level_of_access = '$level' AND P.ID = w.wp_post_id AND w.list_in_search = '$list'   AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords')  ORDER BY P.post_date_gmt DESC ");
		} else {
			$result = $db->prepare("SELECT Distinct * FROM wp_resources as w, wp_posts AS P WHERE w.status = 'publish' AND  w.level_of_access = '$level' AND P.ID = w.wp_post_id AND w.page_order='1' AND  w.list_in_search = '$list'   ORDER BY P.post_date_gmt DESC ");
		}
		//End
	} 
// if search is 0 and life stage is 0 and resourcetype is 0 ends
} else if ($searchvalue == '0'){
// if search is 0 starts
 if($sort == '0'){
//$return_arr['inptu']="5";

	$select = "SELECT Distinct w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id";
	$from = " FROM wp_resources as w, wp_posts AS P";
	$where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100'";
	
	if($resourcetypes != '0'){
		$where .= " and w.type = '$resourcetypes'";
		$where .= " and P.post_type = '$resourcetypes'";
	}
	if($lifestage !== '0'){
		$from .=", life_stage_type AS l";
		$where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
	}
	if($tags !='0'){
        $from .= " , wp_term_relationships as wtr ";
        $where .= " AND w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
     }
	$order = " AND w.page_order = '$pgorder' ";
	//$limit = 'limt 0, 9';
   
	$query1 = $select . $from . $where . $order ;
	$result = $db->prepare($query1);

} else if($sort == 'relevance'){
//$return_arr['inptu']="6";

	$select = "SELECT Distinct w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id";
	$from = " FROM wp_resources as w, wp_posts AS P";
	$where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100'";
	
	if($resourcetypes != '0'){
		$where .= " and w.type = '$resourcetypes'";
		$where .= " and P.post_type = '$resourcetypes'";
	}
	if($lifestage !== '0'){
		$from .=", life_stage_type AS l";
		$where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
	}
	if($tags !='0'){
        $from .= " , wp_term_relationships as wtr ";
        $where .= " AND w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
     }
	$order = " AND w.page_order = '$pgorder'";
	//$limit = 'limt 0, 9';
   
$query1 = $select . $from . $where . $order ;
$result = $db->prepare($query1);

} else if($sort == 'views'){
//$return_arr['inptu']="7";

	$select = "SELECT Distinct w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id, wc.view_count";
	//$from = " FROM wp_resources as w, wp_posts AS P , wp_resources_view_count as wc";
	$from = " FROM wp_posts AS P ";
	$ljoin = ", wp_resources as w left join wp_resources_view_count as wc on wc.wp_post_id = w.wp_post_id ";
	
	$where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' AND w.page_order = '$pgorder'";
	//$where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' AND  wc.wp_post_id = w.wp_post_id  AND w.page_order = '$pgorder'";
	
	if($resourcetypes != '0'){
		$where .= " and w.type = '$resourcetypes'";
		$where .= " and P.post_type = '$resourcetypes'";
	}
	if($lifestage !== '0'){
		$from .=", life_stage_type AS l";
		$where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
	}
	if($tags !='0'){
        $from .= " , wp_term_relationships as wtr ";
        $where .= " AND w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
     }
	$order = "  ORDER BY wc.view_count DESC ";
	//$limit = 'limt 0, 9';
   
	$query1 = $select . $from . $ljoin. $where . $order ;
	$result = $db->prepare($query1);

} else if($sort == 'date'){
//$return_arr['inptu']="8";

	$select = "SELECT Distinct w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id, P.post_date_gmt";
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
	if($tags !='0'){
        $from .= " , wp_term_relationships as wtr ";
        $where .= " AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
     }
	$order = "  ORDER BY P.post_date_gmt DESC ";
	//$limit = 'limt 0, 9';
   
	$query1 = $select . $from . $where . $order ;
	$result = $db->prepare($query1);
} 
// if search is 0 ends
} else{
	//echo '1 sort',$sort;
// if search has value starts
	if($sort == '0'){
//$return_arr['inptu']="9";

		$select = "SELECT Distinct (w.title = '{$unquotedQuery}') AS title_match, match (w.html, w.title) against ('{$searchQuery}') AS relevancy, (w.post_title LIKE '%{$unquotedQuery}%') AS title_rough_match, w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id";
		$from = " FROM wp_resources as w, wp_posts AS P";
		$where = " WHERE  w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' AND w.page_order='1'";
		
		if ($searchQuery != '') {
			$where .= " and (match (w.html, w.title) against ('{$searchQuery}' in boolean mode) or match (P.post_excerpt) against ('{$searchQuery}' in boolean mode))";
		}
		if($resourcetypes != '0'){
			$where .= " and w.type = '$resourcetypes'";
			$where .= " and P.post_type = '$resourcetypes'";
		}
		if($lifestage != '0'){
			$from .=", life_stage_type AS l";
			$where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
		}
		if($tags !='0'){
			$from .= " , wp_term_relationships as wtr ";
			$where .= " AND w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
		}
		$order = " order by title_match desc, title_rough_match desc, relevancy desc";
		//$limit = 'limt 0, 9';
		$query = $select . $from . $where . $order;
		
		$result = $db->prepare($query);
	} else if($sort == 'relevance'){
//$return_arr['inptu']="10";

		$select = "SELECT Distinct (w.title = '{$unquotedQuery}') AS title_match, match (w.html, w.title) against ('{$searchQuery}') AS relevancy, (w.post_title LIKE '%{$unquotedQuery}%') AS title_rough_match, w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id";
		$from = " FROM wp_resources as w, wp_posts AS P";
		$where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' AND w.page_order='1'";
		
		if ($searchQuery != '') {
			$where .= " and (match (w.html, w.title) against ('{$searchQuery}' in boolean mode) or match (P.post_excerpt) against ('{$searchQuery}' in boolean mode))";
		}
		if($resourcetypes != '0'){
			$where .= " and w.type = '$resourcetypes'";
			$where .= " and P.post_type = '$resourcetypes'";
		}
		if($lifestage != '0'){
			$from .=", life_stage_type AS l";
			$where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
		}
		if($tags !='0'){
			$from .= " , wp_term_relationships as wtr ";
			$where .= " AND w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
		}
		$order = " order by title_match desc, title_rough_match desc, relevancy desc ";
		//$limit = 'limt 0, 9';
		$query = $select . $from . $where . $order;
		
		$result = $db->prepare($query);
	} else if($sort == 'views'){
//$return_arr['inptu']="11";

		$select = "SELECT Distinct (w.title = '{$unquotedQuery}') AS title_match, match (w.html, w.title) against ('{$searchQuery}') AS relevancy, (w.post_title LIKE '%{$unquotedQuery}%') AS title_rough_match, w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id, wc.view_count";
		//$from = " FROM wp_resources as w, wp_posts AS P, wp_resources_view_count as wc";
		
		$from = " FROM wp_posts AS P ";
		$ljoin = ", wp_resources as w left join wp_resources_view_count as wc on wc.wp_post_id = w.wp_post_id ";
		$where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' AND w.page_order='1'";
		//$where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' AND  wc.wp_post_id = w.wp_post_id ";
		
		if ($searchQuery != '') {
			$where .= " and (match (w.html, w.title) against ('{$searchQuery}' in boolean mode) or match (P.post_excerpt) against ('{$searchQuery}' in boolean mode))";
		}
		if($resourcetypes != '0'){
			$where .= " and w.type = '$resourcetypes'";
			$where .= " and P.post_type = '$resourcetypes'";
		}
		if($lifestage != '0'){
			$from .=", life_stage_type AS l";
			$where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
		}
		if($tags !='0'){
			$from .= " , wp_term_relationships as wtr ";
			$where .= " AND w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
		}
		$order = "  ORDER BY wc.view_count DESC ";
		//$limit = 'limt 0, 9';
		$query = $select . $from . $ljoin. $where . $order;
		
		$result = $db->prepare($query);
	} else if($sort == 'date'){
//$return_arr['inptu']="12";

		$select = "SELECT Distinct (w.title = '{$unquotedQuery}') AS title_match, match (w.html, w.title) against ('{$searchQuery}') AS relevancy, (w.post_title LIKE '%{$unquotedQuery}%') AS title_rough_match, w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id, P.post_date_gmt";
		$from = " FROM wp_resources as w, wp_posts AS P";
		$where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' AND w.page_order='1'";
		
		if ($searchQuery != '') {
			$where .= " and (match (w.html, w.title) against ('{$searchQuery}' in boolean mode) or match (P.post_excerpt) against ('{$searchQuery}' in boolean mode))";
		}
		if($resourcetypes != '0'){
			$where .= " and w.type = '$resourcetypes'";
			$where .= " and P.post_type = '$resourcetypes'";
		}
		if($lifestage != '0'){
			$from .=", life_stage_type AS l";
			$where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
		}
		if($tags !='0'){
			$from .= " , wp_term_relationships as wtr ";
			$where .= " AND w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
		}
		$order = "  ORDER BY P.post_date_gmt DESC ";
		//$limit = 'limt 0, 9';
		$query = $select . $from . $where . $order;
		$result = $db->prepare($query);
	} 
// if search has value ends
}

//$return_arr['query']=$query1;
//echo $query;
$result->execute();
//
$rcount = $result->rowCount();
//$return_arr["count"] = $rcount;
$limit = '9';
$totalpages = ceil( $rcount / $limit );
//echo $rcount;
//echo $totalpages;
    
$output .='<nav aria-label="balance pager m14-m15" balance-pager="" class="paging-holder clear">
<ul class="pagination">';
if ($pvalue > 1) {
	if($totalpages != 1){
$output .='<li style="padding-top: 4px; padding-left: 17px;">
<div class="search-prv-click" query="'.$searchvalue.'" pager="'.($pvalue-1).'" aria-label="Next"  resourcetypes="'.$resourcetypes.'" lifestage="'.$lifestage.'"   sort="'.$sort.'">
	<div style="float: left; margin-top:2px; margin-right:2px;   cursor: pointer;">
	<span class="btn-prev"></span>
</div>
<div style="float: left;  cursor: pointer; ">
	<span class="hidden-xs"></span>
</div>
</div>
</li>';
	}
}
if(empty($pvalue) or $pvalue == '' or $pvalue == 0 or $pvalue == '0'){
	$pvalue = 1;
}
if($pvalue == $totalpages){
	//for ($i=1; $i <= min($totalpages,10); $i++) {

	if ($totalpages == 1) {
		$output .= '<li class="active" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: #6BD9DE; color: #fff;" totalpages="' . $totalpages . '" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="1" sort="' . $sort . '">1</li>';
	} else if ($totalpages <= 6) {
		if ($pvalue > 2) {
			// Always show the first page
			$output .= '<li class="pg-btn-search" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: #fff; color: #000;" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="1" sort="' . $sort . '">1</li>';
			// Add ellipsis if not on the first two pages
			if ($pvalue > 3) {
				$output .= '<li class="disabled" style="padding:0px 5px;  font-size:22px; position:relative; bottom :5px; color : #6BD9DE;">..</li>';
			}
		}
	
		// Show pages around the current page
		$start = max(1, $pvalue - 1); // One page before current
		$end = min($totalpages, $pvalue + 1); // One page after current
		for ($i = $start; $i <= $end; $i++) {
			$output .= '<li class="pg-btn-search ' . ($pvalue == $i ? 'active' : '') . '" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: ' . ($pvalue == $i ? '#6BD9DE' : '#fff') . '; color: ' . ($pvalue == $i ? '#fff' : '#000') . ';" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="' . $i . '" sort="' . $sort . '">' . $i . '</li>';
		}
	
		if ($pvalue < $totalpages - 1) {
			// Add ellipsis if not on the last two pages
			if ($pvalue < $totalpages - 2) {
				$output .= '<li class="disabled" style="padding:0px 5px;  font-size:22px; position:relative; bottom :5px; color : #6BD9DE;">..</li>';
			}
			// Always show the last page
			$output .= '<li class="pg-btn-search" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: #fff; color: #000;" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="' . $totalpages . '" sort="' . $sort . '">' . $totalpages . '</li>';
		}
	} else if ((6 + $pvalue - 1) < $totalpages) {
		for ($i = (1 + $pvalue - 1); $i <= (6 + $pvalue - 1); $i++) {
			$output .= '<li class="pg-btn-search ' . ($pvalue == $i ? 'active' : '') . '" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: #6BD9DE; color: #fff;" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="' . $i . '" sort="' . $sort . '">' . $i . '</li>';
		}
	} else {
		// Include ellipses for large pagination
		$output .= '<li class="pg-btn-search" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: #fff; color: #000;" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="1" sort="' . $sort . '">1</li>';
		$output .= '<li class="disabled" style="padding:0px 5px;  font-size:22px; position:relative; bottom :5px; color : #6BD9DE;">..</li>';
		for ($i = ($totalpages - 5); $i <= $totalpages; $i++) {
			$output .= '<li class="pg-btn-search ' . ($pvalue == $i ? 'active' : '') . '" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: #6BD9DE; color: #fff;" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="' . $i . '" sort="' . $sort . '">' . $i . '</li>';
		}
	}
	
	

	// 	for ($i= max(1, $pvalue); $i <= min($pvalue + 5, $totalpages); $i++) {	
	// $output .='<li class="pg-btn-search '.($pvalue == $i ? 'active' : '').'" style="padding:5px 6px; cursor: pointer"  resourcetypes="'.$resourcetypes.'" lifestage="'.$lifestage.'" queryvalue="'.$searchvalue.'" pagerv="'.$i.'"  sort="'.$sort.'">'.$i.'</li>';
	// }


	if ($pvalue < $totalpages) {
	$output .='<li style="padding-top: 4px; padding-left: 17px;">
	<div class="search-nxt-click" style="cursor: pointer" query="'.$searchvalue.'" pager="'.($pvalue+1).'" resourcetypes="'.$resourcetypes.'" lifestage="'.$lifestage.'" sort="'.$sort.'">
		<div style="float:left;margin-left: 2px; cursor: pointer;"><span class="hidden-xs"></span></div>
				<div style="float:left;margin-top: 2px;  cursor: pointer;"><span class="btn-next"></span></div>
	</div>
	</li>';
	}
	
	
	$output .='</ul>
		
</nav>';
	}
	else{
//for ($i=1; $i <= min($totalpages,10); $i++) {

if ($totalpages == 1) {
	// Single page, no ellipsis needed
	$output .= '<li class="active" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: #6BD9DE; color: #fff;" totalpages="' . $totalpages . '" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="1" sort="' . $sort . '">1</li>';
} else if ($totalpages <= 6) {
	// Add ellipses even when total pages <= 6
	if ($pvalue > 2) {
		// Always show the first page
		$output .= '<li class="pg-btn-search" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: #fff; color: #000;" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="1" sort="' . $sort . '">1</li>';
		// Add ellipsis if not on the first two pages
		if ($pvalue > 3) {
			$output .= '<li class="disabled" style="padding:0px 5px;  font-size:22px; position:relative; bottom :5px; color : #6BD9DE;">..</li>';
		}
	}

	// Show the actual range of pages
	for ($i = max(1, $pvalue - 1); $i <= min($totalpages, $pvalue + 1); $i++) {
		$output .= '<li class="pg-btn-search ' . ($pvalue == $i ? 'active' : '') . '" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: ' . ($pvalue == $i ? '#6BD9DE' : '#fff') . '; color: ' . ($pvalue == $i ? '#fff' : '#000') . ';" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="' . $i . '" sort="' . $sort . '">' . $i . '</li>';
	}

	if ($pvalue < $totalpages - 1) {
		// Add ellipsis if not on the last two pages
		if ($pvalue < $totalpages - 2) {
			$output .= '<li class="disabled" style="padding:0px 5px;  font-size:22px; position:relative; bottom :5px; color : #6BD9DE;">..</li>';
		}
		// Always show the last page
		$output .= '<li class="pg-btn-search" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: #fff; color: #000;" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="' . $totalpages . '" sort="' . $sort . '">' . $totalpages . '</li>';
	}
} else if ((6 + $pvalue - 1) < $totalpages) {
    // Show the first page
    $output .= '<li class="pg-btn-search" style="padding:0px 5px; border-radius: 5px; cursor: pointer;" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="1" sort="' . $sort . '">1</li>';
    
    // Add ellipsis if there are skipped pages
    if ($pvalue > 4) {
        $output .= '<li class="disabled" style="padding:0px 5px; font-size:22px; position:relative; bottom:5px; color:#6BD9DE;">..</li>'; // Ellipsis
    }

    // Pagination for pages greater than 6 with dynamic ranges
    for ($i = (1 + $pvalue - 1); $i <= (6 + $pvalue - 1); $i++) {
        if ($i <= $totalpages) { // Ensure we don't exceed total pages
            $output .= '<li class="pg-btn-search ' . ($pvalue == $i ? 'active' : '') . '" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: ' . ($pvalue == $i ? '#6BD9DE' : '#fff') . '; color: ' . ($pvalue == $i ? '#fff' : '#000') . ';" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="' . $i . '" sort="' . $sort . '">' . $i . '</li>';
        }
    }

    // Add ellipsis if there are more else {
	// Default large pagination case with ellipsis
	$output .= '<li class="pg-btn-search" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: #fff; color: #000;" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="1" sort="' . $sort . '">1</li>';
	$output .= '<li class="disabled" style="padding:0px 5px;  font-size:22px; position:relative; bottom :5px; color : #6BD9DE;">..</li>';
	for ($i = ($totalpages - 5); $i <= $totalpages; $i++) {
		$output .= '<li class="pg-btn-search ' . ($pvalue == $i ? 'active' : '') . '" style="padding:0px 5px; border-radius: 5px; cursor: pointer; background-color: #6BD9DE; color: #fff;" resourcetypes="' . $resourcetypes . '" lifestage="' . $lifestage . '" queryvalue="' . $searchvalue . '" pagerv="' . $i . '" sort="' . $sort . '">' . $i . '</li>';
	}
}

// 	for ($i= max(1, $pvalue ); $i <= min($pvalue + 5, $totalpages); $i++) {	
// $output .='<li class="pg-btn-search '.($pvalue == $i ? 'active' : '').'" style="padding:5px 6px; cursor: pointer"  resourcetypes="'.$resourcetypes.'" lifestage="'.$lifestage.'" queryvalue="'.$searchvalue.'" pagerv="'.$i.'"  sort="'.$sort.'">'.$i.'</li>';
// }
if ($pvalue < $totalpages) {
$output .='<li style="padding-top: 4px; padding-left: 17px;">
<div class="search-nxt-click" style="cursor: pointer" query="'.$searchvalue.'" pager="'.($pvalue+1).'" resourcetypes="'.$resourcetypes.'" lifestage="'.$lifestage.'" sort="'.$sort.'">
	<div style="float:left;margin-left: 2px; cursor: pointer;"><span class="hidden-xs"></span></div>
				<div style="float:left;margin-top: 2px;  cursor: pointer;"><span class="btn-next"></span></div>
</div>
</li>';
}
	
	$output .='</ul>
		
</nav>';
	}
//if($rcount==0)	$output='';
$return_arr['message'] = $output;
echo json_encode($return_arr);
?>