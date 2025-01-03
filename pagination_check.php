<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// SET HEADER
header("Content-Type: application/json; charset=UTF-8");

// INCLUDING DATABASE AND MAKING OBJECT
include('database.php');include('functions.php');
// MAKE SQL QUERY
$personData = json_decode($_REQUEST['data']);
$dvaluen = $personData->dvalue;
$page = $personData->page;
$lifestage = $personData->lifestage;
if(empty($lifestage)){
	$lifestage = '0';   
}
//$tags = $personData->tags;
$search = $personData->search;
$sort = $personData->sort;
//$rtypes = $personData->rtype;
$search = $personData->search;
if(empty($lifestage)){
	$lifestage = '0';   
}
$search = $personData->search;
$searchvalue = $personData->search;
if(empty($search)){
	$search = '0';   
}
    $rtypes = $personData->dvalue;
    $resourcetypes = $personData->dvalue;

if(!empty($personData->rtypes)){
    $resourcetypes = $personData->rtypes;
    $rtypes = $personData->rtypes;
    $rtype = $personData->rtypes;
    $rt = $personData->rtypes;
} 

if(!empty($personData->rtype)){
    $rt = $personData->rtype;
    $resourcetypes = $personData->rtype;
    $rtypes = $personData->rtype;
    $rtype = $personData->rtype; 
}  

if(!empty($personData->type)){
    $rt = $personData->type;
    $resourcetypes = $personData->type;
    $rtypes = $personData->type;
    $rtype = $personData->type; 
} 
if(empty($sort)){
	$sort = '0';   
}
$tags = $personData->tags;
$keywords= explode(',', $tags);
$advancedkeywords = implode("', '", $keywords);

if(empty($tags) or $tags == '' ){
    $tags = '0' ; 
}

if(empty($dvalue)){
    $dvalue = '0' ;  
}
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
$limitn = ' limit 9';

if($search == '0' AND $lifestage == '0' AND $dvaluen == '0'){
// if search is 0 and life stage is 0 and resourcetype is 0 starts
	  if($sort == "0"){
        if($tags =='0'){
            $query = "SELECT Distinct * FROM wp_resources WHERE status = 'publish' AND level_of_access = '$level' AND list_in_search = '$list' AND page_order = '$pgorder' ";
            $queryt = "SELECT Distinct * FROM wp_resources WHERE status = 'publish' AND level_of_access = '$level' AND list_in_search = '$list' AND page_order = '$pgorder'";
        } else {
           // echo "1";
            $query = "SELECT Distinct * FROM wp_resources as w, wp_term_relationships as wtr WHERE w.status = 'publish' AND w.level_of_access = '$level' AND w.list_in_search = '$list' AND w.page_order = '$pgorder' AND w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
            $queryt = "SELECT Distinct * FROM wp_resources as w, wp_term_relationships as wtr WHERE w.status = 'publish' AND w.level_of_access = '$level' AND w.list_in_search = '$list' AND w.page_order = '$pgorder' AND w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords')";
        }
        
        $checkn = $db->prepare($query);
}else if($sort == "relevance"){
    if($tags =='0'){
        $query = "SELECT Distinct * FROM wp_resources WHERE status = 'publish' AND level_of_access = '$level' AND list_in_search = '$list' AND page_order = '$pgorder'";
    } else {
        $query = "SELECT Distinct * FROM wp_resources as w, wp_term_relationships as wtr WHERE w.status = 'publish' AND w.level_of_access = '$level' AND w.list_in_search = '$list' AND w.page_order = '$pgorder' AND w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords')";
    }
    $checkn = $db->prepare($query);
    
}else if($sort == "views"){
    if($tags =='0'){
        $query = "SELECT Distinct w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id, wc.view_count from wp_resources as w, wp_resources_view_count as wc where w.status = 'publish' AND w.level_of_access = '$level' AND w.list_in_search = '$list' AND w.page_order = '$pgorder' AND wc.wp_post_id = w.wp_post_id ORDER BY wc.view_count DESC";
    } else {
        $query = "SELECT Distinct w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id, wc.view_count from wp_resources as w, wp_resources_view_count as wc, wp_term_relationships as wtr where w.status = 'publish' AND w.level_of_access = '$level' AND w.list_in_search = '$list' AND w.page_order = '$pgorder' AND w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') AND wc.wp_post_id = w.wp_post_id ORDER BY wc.view_count DESC";
    }
    //$query = "SELECT Distinct  * FROM wp_resources WHERE level_of_access = '$level' AND list_in_search = '$list' AND page_order = '$pgorder' limit $start, $limit";
        $checkn = $db->prepare($query);
    
}else if($sort == "date"){
    if($tags =='0'){
    $query = "SELECT Distinct * FROM wp_resources as w, wp_posts AS P WHERE w.status = 'publish' AND w.level_of_access = '$level' AND P.ID = w.wp_post_id AND w.list_in_search = '$list' AND page_order = '$pgorder' ORDER BY P.post_date_gmt DESC";
    } else {
    $query = "SELECT Distinct * FROM wp_resources as w, wp_posts AS P, wp_term_relationships as wtr WHERE w.status = 'publish' AND w.level_of_access = '$level' AND w.list_in_search = '$list' AND w.page_order = '$pgorder' and w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') AND w.level_of_access = '$level' AND P.ID = w.wp_post_id AND w.list_in_search = '$list' ORDER BY P.post_date_gmt DESC";    
    }
        //$query = "SELECT Distinct  * FROM wp_resources WHERE level_of_access = '$level' AND list_in_search = '$list' AND page_order = '$pgorder' limit $start, $limit";
    $checkn = $db->prepare($query);

}
// if search is 0 and life stage is 0 and resourcetype is 0 ends
}else
if($search !== '0'){
// if search has value starts
if($sort == "0"){ 
      $select = "SELECT Distinct  (w.title = '{$unquotedQuery}') AS title_match, match (w.html, w.title) against ('{$searchQuery}') AS relevancy, (w.post_title LIKE '%{$unquotedQuery}%') AS title_rough_match, w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id";
    $from = " FROM wp_resources as w, wp_posts AS P ";
    $where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' AND w.page_order = '$pgorder' ";
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

if($tags !='0'){
    $from .= " , wp_term_relationships as wtr ";
    $where .= " AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
 }
    $order = " order by title_match desc, title_rough_match desc, relevancy desc";
    //$limit = 'limt 0, 9';
    $ln   =" limit $start, $limit";
    $query = $select . $from . $where . $order;
     
 $check = $db->prepare($query);
 $query1 = $select . $from . $where . $order ;
 $checkn = $db->prepare($query1);

}else if($sort == "relevance"){
       $select = "SELECT Distinct  (w.title = '{$unquotedQuery}') AS title_match, match (w.html, w.title) against ('{$searchQuery}') AS relevancy, (w.post_title LIKE '%{$unquotedQuery}%') AS title_rough_match, w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id";
    $from = " FROM wp_resources as w, wp_posts AS P, wp_resources_view_count as wc";
    $where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' AND wc.wp_post_id = w.wp_post_id AND w.page_order = '$pgorder' ";
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

if($tags !='0'){
    $from .= " , wp_term_relationships as wtr ";
    $where .= " AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
 }

    $order = " order by title_match desc, title_rough_match desc, relevancy desc";
    //$limit = 'limt 0, 9';
   $ln   =" limit $start, $limit";
     $query = $select . $from . $where . $order ;
     
 $check = $db->prepare($query);
 $query1 = $select . $from . $where . $order ;
 $checkn = $db->prepare($query1);    
}else if($sort == "views"){
   $select = "SELECT Distinct  (w.title = '{$unquotedQuery}') AS title_match, match (w.html, w.title) against ('{$searchQuery}') AS relevancy, (w.post_title LIKE '%{$unquotedQuery}%') AS title_rough_match, w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id, wc.view_count";
    $from = " FROM wp_resources as w, wp_posts AS P, wp_resources_view_count as wc";
    $where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' AND wc.wp_post_id = w.wp_post_id AND w.page_order = '$pgorder' ";
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

if($tags !='0'){
    $from .= " , wp_term_relationships as wtr ";
    $where .= " AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
 }
    $order = " order by wc.view_count desc";
    //$limit = 'limt 0, 9';
   $ln   =" limit $start, $limit";
     $query = $select . $from . $where . $order ;
     
 $check = $db->prepare($query);
 $query1 = $select . $from . $where . $order ;
 $checkn = $db->prepare($query1);
}else if($sort == "date"){
    $select = "SELECT Distinct  (w.title = '{$unquotedQuery}') AS title_match, match (w.html, w.title) against ('{$searchQuery}') AS relevancy, (w.post_title LIKE '%{$unquotedQuery}%') AS title_rough_match, w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id, P.post_date_gmt";
    $from = " FROM wp_resources as w, wp_posts AS P, wp_resources_view_count as wc";
    $where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' AND wc.wp_post_id = w.wp_post_id AND w.page_order = '$pgorder' ";
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

if($tags !='0'){
    $from .= " , wp_term_relationships as wtr ";
    $where .= " AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
 }

    $order = "  ORDER BY P.post_date_gmt DESC";
    //$limit = 'limt 0, 9';
   $ln   =" limit $start, $limit";
     $query = $select . $from . $where . $order ;
     
 $check = $db->prepare($query);
 $query1 = $select . $from . $where . $order ;
 $checkn = $db->prepare($query1);
}
// if search has value ends
} else 
if ($search == '0'){
// if search is 0 starts
	  if($sort == "0"){
      $select = "SELECT Distinct   w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id";
     $from = " FROM wp_resources as w, wp_posts AS P";
     $where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100'";
     
     if($rtypes != '0'){
         $where .= " and w.type = '$rtypes'";
         $where .= " and P.post_type = '$rtypes'";
     }
    
     if($lifestage !== '0'){
        $from .=", life_stage_type AS l";
        $where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
     }

if($tags !='0'){
    $from .= " , wp_term_relationships as wtr ";
    $where .= " AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
 }

     $order = " AND w.page_order = '$pgorder'";
     //$limit = 'limt 0, 9';
     $ln   =" limit $start, $limit";
     $query = $select . $from . $where . $order ;

     //echo $query
     
 $check = $db->prepare($query);
 $query1 = $select . $from . $where . $order ;
 $checkn = $db->prepare($query1);

}else if($sort == "relevance"){
 $select = "SELECT Distinct   w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id";
     $from = " FROM wp_resources as w, wp_posts AS P, wp_resources_view_count as wc";
     $where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' AND wc.wp_post_id = w.wp_post_id";
     
     if($rtypes != '0'){
         $where .= " and w.type = '$rtypes'";
         $where .= " and P.post_type = '$rtypes'";
     }
    
     if($lifestage !== '0'){
        $from .=", life_stage_type AS l";
        $where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
     }

if($tags !='0'){
    $from .= " , wp_term_relationships as wtr ";
    $where .= " AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
 }

     $order = " AND w.page_order = '$pgorder'";
     //$limit = 'limt 0, 9';
     $ln   =" limit $start, $limit";
     $query = $select . $from . $where . $order . $ln;
     
 $check = $db->prepare($query);
 $query1 = $select . $from . $where . $order ;
 $checkn = $db->prepare($query1);

}else if($sort == "views"){
 $select = "SELECT Distinct   w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id, wc.view_count";
     $from = " FROM wp_resources as w, wp_posts AS P, wp_resources_view_count as wc";
     $where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' AND wc.wp_post_id = w.wp_post_id AND w.page_order = '$pgorder' ";
     
     if($rtypes != '0'){
         $where .= " and w.type = '$rtypes'";
         $where .= " and P.post_type = '$rtypes'";
     }
    
     if($lifestage !== '0'){
        $from .=", life_stage_type AS l";
        $where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
     }

if($tags !='0'){
    $from .= " , wp_term_relationships as wtr ";
    $where .= " AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
 }

     $order = " AND ORDER BY wc.view_count DESC";
     //$limit = 'limt 0, 9';
     $ln   =" limit $start, $limit";
     $query = $select . $from . $where . $order . $ln;
     
 $check = $db->prepare($query);
 $query1 = $select . $from . $where . $order ;
 $checkn = $db->prepare($query1);
    
}else if($sort == "date"){
 $select = "SELECT Distinct   w.post_title, w.level_of_access, w.list_in_search, w.page_order, w.title, w.type, w.slug, w.wp_post_id, P.post_date_gmt";
     $from = " FROM wp_resources as w, wp_posts AS P, wp_resources_view_count as wc";
     $where = " WHERE w.status = 'publish' AND P.ID = w.wp_post_id AND w.list_in_search = 'true' AND w.level_of_access = '100' AND wc.wp_post_id = w.wp_post_id AND w.page_order = '$pgorder' ";
     
     if($rtypes != '0'){
         $where .= " and w.type = '$rtypes'";
         $where .= " and P.post_type = '$rtypes'";
     }
     if($lifestage !== '0'){
                 $from .=", life_stage_type AS l";
         $where .= " AND l.lifestagetype = '$lifestage' AND l.postid = w.ID";
     }
     
    if($tags !='0'){
        $from .= " , wp_term_relationships as wtr ";
        $where .= " AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ";
    }

     $order = " ORDER BY P.post_date_gmt DESC";
     //$limit = 'limt 0, 9';
     $ln   =" limit $start, $limit";
     $query = $select . $from . $where . $order . $ln;
     
    $check = $db->prepare($query);
    $query1 = $select . $from . $where . $order ;
    $checkn = $db->prepare($query1);
}
// if search is 0 ends
}else
if($dvaluen != '0'){
// if resourcetype has value starts
    $check = $db->prepare("SELECT Distinct * FROM wp_resources WHERE status = 'publish' AND type = '$dvaluen' AND level_of_access = '$level' AND list_in_search = '$list' AND page_order = '$pgorder' limit $start, $limit");
    $checkn = $db->prepare("SELECT Distinct * FROM wp_resources WHERE status = 'publish' AND type = '$dvaluen' AND level_of_access = '$level' AND list_in_search = '$list' AND page_order = '$pgorder'");

if($sort == "0"){
    if($tags =='0'){
        $check = $db->prepare("SELECT Distinct * FROM wp_resources as w WHERE w.status = 'publish' AND w.type = '$dvaluen' AND w.level_of_access = '$level' AND w.list_in_search = '$list' AND w.page_order = '$pgorder' limit $start, $limit");
        $checkn = $db->prepare("SELECT Distinct * FROM wp_resources as w WHERE w.status = 'publish' AND w.type = '$dvaluen' AND w.level_of_access = '$level' AND w.list_in_search = '$list' AND w.page_order = '$pgorder'");
    } else {
        $check = $db->prepare("SELECT Distinct * FROM wp_resources as w, wp_term_relationships as wtr WHERE w.status = 'publish' AND w.type = '$dvaluen' AND w.level_of_access = '$level' AND w.list_in_search = '$list' AND w.page_order = '$pgorder' AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') limit $start, $limit");
        $checkn = $db->prepare("SELECT Distinct * FROM wp_resources as w, wp_term_relationships as wtr WHERE w.status = 'publish' AND w.type = '$dvaluen' AND w.level_of_access = '$level' AND w.list_in_search = '$list' AND w.page_order = '$pgorder' AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords')");
    }
}else if($sort == "relevance"){
    if($tags =='0'){
        $check = $db->prepare("SELECT Distinct * FROM wp_resources as w WHERE w.status = 'publish' AND w.type = '$dvaluen' AND w.level_of_access = '$level' AND w.list_in_search = '$list' AND w.page_order = '$pgorder' limit $start, $limit");
        $checkn = $db->prepare("SELECT Distinct * FROM wp_resources as w WHERE w.status = 'publish' AND w.type = '$dvaluen' AND w.level_of_access = '$level' AND w.list_in_search = '$list' AND w.page_order = '$pgorder'");
    } else {
        $check = $db->prepare("SELECT Distinct * FROM wp_resources as w, wp_term_relationships as wtr WHERE w.status = 'publish' AND w.type = '$dvaluen' AND w.level_of_access = '$level' AND w.list_in_search = '$list' AND w.page_order = '$pgorder' AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') limit $start, $limit");
        $checkn = $db->prepare("SELECT Distinct * FROM wp_resources as w, wp_term_relationships as wtr WHERE w.status = 'publish' AND w.type = '$dvaluen' AND w.level_of_access = '$level' AND w.list_in_search = '$list' AND w.page_order = '$pgorder' AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id` IN ('$advancedkeywords')");
    }

    
}else if($sort == "views"){
    if($tags =='0'){
        $check = $db->prepare("SELECT Distinct * FROM wp_resources as w, wp_resources_view_count as wc  WHERE w.status = 'publish' AND w.type = '$dvaluen' AND w.level_of_access = '$level' AND w.page_order = '$pgorder' AND w.list_in_search = '$list' AND  wc.wp_post_id = w.wp_post_id ORDER BY wc.view_count DESC limit $start, $limit");
        $checkn = $db->prepare("SELECT Distinct * FROM wp_resources as w, wp_resources_view_count as wc WHERE w.status = 'publish' AND type = '$dvaluen' AND level_of_access = '$level' AND list_in_search = '$list' AND w.page_order = '$pgorder' AND  wc.wp_post_id = w.wp_post_id ORDER BY wc.view_count DESC");
    } else {
        $check = $db->prepare("SELECT Distinct * FROM wp_resources as w, wp_resources_view_count as wc, wp_term_relationships as wtr WHERE w.status = 'publish' AND w.type = '$dvaluen' AND w.level_of_access = '$level' AND w.list_in_search = '$list' AND w.page_order = '$pgorder' AND  wc.wp_post_id = w.wp_post_id AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ORDER BY wc.view_count DESC limit $start, $limit");
        $checkn = $db->prepare("SELECT Distinct * FROM wp_resources as w, wp_resources_view_count as wc WHERE w.status = 'publish' AND type = '$dvaluen' AND level_of_access = '$level' AND w.page_order = '$pgorder' AND list_in_search = '$list' AND  wc.wp_post_id = w.wp_post_id AND  w.wp_post_id = wtr.object_id AND wtr.term_taxonomy_id IN ('$advancedkeywords') ORDER BY wc.view_count DESC");
    }
        //$query = "SELECT Distinct  * FROM wp_resources WHERE level_of_access = '$level' AND list_in_search = '$list' AND page_order = '$pgorder' limit $start, $limit";
    
}else if($sort == "date"){
    if($tags =='0'){
        $check = $db->prepare("SELECT Distinct * FROM wp_resources as w, wp_posts AS P, wp_resources_view_count as wc WHERE w.status = 'publish' AND type = '$dvaluen' AND level_of_access = '$level' AND w.page_order = '$pgorder' AND list_in_search = '$list' AND  wc.wp_post_id = w.wp_post_id ORDER BY P.post_date_gmt DESC limit $start, $limit");
        $checkn = $db->prepare("SELECT Distinct * FROM wp_resources as w, wp_posts AS P, wp_resources_view_count as wc WHERE w.status = 'publish' AND type = '$dvaluen' AND level_of_access = '$level' AND w.page_order = '$pgorder' AND list_in_search = '$list' AND  wc.wp_post_id = w.wp_post_id ORDER BY P.post_date_gmt DESC");
    } else {
        $check = $db->prepare("SELECT Distinct * FROM wp_resources as w, wp_posts AS P, wp_resources_view_count as wc, wp_term_relationships as wtr WHERE w.status = 'publish' AND type = '$dvaluen' AND level_of_access = '$level' AND list_in_search = '$list' AND w.page_order = '$pgorder' AND  wc.wp_post_id = w.wp_post_id ORDER BY P.post_date_gmt DESC limit $start, $limit");
        $checkn = $db->prepare("SELECT Distinct * FROM wp_resources as w, wp_posts AS P, wp_resources_view_count as wc, wp_term_relationships as wtr WHERE w.status = 'publish' AND type = '$dvaluen' AND level_of_access = '$level' AND list_in_search = '$list' AND w.page_order = '$pgorder' AND  wc.wp_post_id = w.wp_post_id ORDER BY P.post_date_gmt DESC");
    }
    //$query = "SELECT Distinct  * FROM wp_resources WHERE level_of_access = '$level' AND list_in_search = '$list' AND page_order = '$pgorder' limit $start, $limit";
}
// if resourcetype has value ends
}
$checkn->execute();$countthem = $checkn->rowCount();
//now count row 
$checkcountn = $checkn->rowCount();

//echo  $checkcountn;
    $return_arr['query'] = $checkn;

$totalpages = ceil( $checkcountn / $limit );
$output = '';
$output .='<nav aria-label="balance pager m14-m15" balance-pager="" class="paging-holder clear">
   <ul class="pagination">'
    
    if (empty($page) || $page == '' || $page == 0 || $page == '0') {
        $page = 1;
    }

    // "Previous" button
    if ($page > 1 && $totalpages != 1) {
        $output .= '<li>
            <div class="prv-btn" sort="' . $sort . '" search="' . $search . '" lifestage="' . $lifestage . '" type="' . $dvaluen . '" pager="' . ($page - 1) . '">
                <div style="float:left;margin-right: 5px;margin-left: 10px;margin-top: 11px; cursor: pointer;">
                    <span class="btn-prev"></span>
                </div>
                <div style="float:left;margin-top: 7px;  cursor: pointer; margin-right: 22px;">
                    <span class="hidden-xs"></span>
                </div>
            </div>
        </li>';
    }

    // Ellipses before the current range
    if ($page > 3) {
        $output .= '<li class="pg-btn" style="padding:5px 6px; cursor: pointer" sort="' . $sort . '" search="' . $search . '" lifestage="' . $lifestage . '" typevalue="' . $dvaluen . '" pagerv="1">1</li>';
        if ($page > 4) {
            $output .= '<li class="pg-btn disabled" style="padding:5px 6px; cursor: default;">...</li>';
        }
    }

    // Display current range of pages
    $startPage = max(1, $page - 2);
    $endPage = min($totalpages, $page + 2);

    for ($i = $startPage; $i <= $endPage; $i++) {
        $output .= '<li class="pg-btn ' . ($page == $i ? 'active' : '') . '" style="padding:5px 6px; cursor: pointer" sort="' . $sort . '" search="' . $search . '" lifestage="' . $lifestage . '" typevalue="' . $dvaluen . '" pagerv="' . $i . '">' . $i . '</li>';
    }

    // Ellipses after the current range
    if ($page < $totalpages - 2) {
        if ($page < $totalpages - 3) {
            $output .= '<li class="pg-btn disabled" style="padding:5px 6px; cursor: default;">...</li>';
        }
        $output .= '<li class="pg-btn" style="padding:5px 6px; cursor: pointer" sort="' . $sort . '" search="' . $search . '" lifestage="' . $lifestage . '" typevalue="' . $dvaluen . '" pagerv="' . $totalpages . '">' . $totalpages . '</li>';
    }

    // "Next" button
    if ($page < $totalpages) {
        $output .= '<li>
            <div class="next-btn" sort="' . $sort . '" search="' . $search . '" lifestage="' . $lifestage . '" type="' . $dvaluen . '" pager="' . ($page + 1) . '" tab="sdff' . $page . '">
                <div style="float:left;margin-right: 5px;margin-left: 22px;margin-top: 4px; cursor: pointer;">
                    <span class="hidden-xs"></span>
                </div>
                <div style="float:left;margin-top: 10px;  cursor: pointer;">
                    <span class="btn-next"></span>
                </div>
            </div>
        </li>';
    }

    $output .= '</ul>';
    if ($totalpages > 1) {
        $output .= '<p>
            <span>of&nbsp;</span>
            <span class="ng-binding">' . $totalpages . '</span>
            <span>&nbsp;pages</span>
        </p>';
    } else {
        $output .= '<p>
            <span>of&nbsp;</span>
            <span class="ng-binding">' . $totalpages . '</span>
            <span>&nbsp;page</span>
        </p>';
    }
   



								
	$return_arr['message'] = $output;
	echo json_encode($return_arr);
?>