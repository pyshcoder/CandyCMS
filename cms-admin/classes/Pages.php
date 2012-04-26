<?php

/**
* @package CandyCMS
* @version 0.1
* @copyright Copyright 2012 (C) Cocoon Design Ltd. - All Rights Reserved
* 
* Methods for editing pages in the admin panel
*/

class Pages {
	
	public static function listPages(){
	
		$dbh = new CandyDB();
		$sth = $dbh->prepare('SELECT * FROM '. DB_PREFIX .'pages');
		$sth->execute();
		return $sth->fetchAll(PDO::FETCH_CLASS);
		
	}
	
	public static function inNav(){
	
		$dbh = new CandyDB();
		$sth = $dbh->prepare('SELECT * FROM '. DB_PREFIX .'pages WHERE innav = 1 ORDER BY navpos');
		$sth->execute();
		return $sth->fetchAll(PDO::FETCH_CLASS);
		
	}
	
	public static function sortPages(){
		
		$pages = self::inNav();

		$html = '<ul id="sortable">';
		
		foreach ($pages as $page) {
			$html .= "<li id='nav_{$page->page_id}'>{$page->page_title}<span class='move'></span></li>";
		}
		
		$html .= '</ul>';
		
		echo $html;
	}
	
	public static function saveNav($nav){
		
		$dbh = new CandyDB();

		foreach ($nav as $key => $item) {
			$dbh->exec("UPDATE ". DB_PREFIX ."pages SET navpos='$key' WHERE page_id='$item'");			
		}
		
	}
	
	public static function dropdownPages($name = "pages", $selected = false){
		
		$pages = self::listPages();
		
		$html = "<select name='$name'>";
		
		foreach ($pages as $page) {
			$html .= ($selected == $page->rewrite) ? "<option value='{$page->rewrite}' selected='selected'>" : "<option value='{$page->rewrite}'>";
			$html .= $page->page_title;
			$html .= '</option>';
		}
		
		$html .= "</select>";
		
		echo $html;
		
	}

	public static function pagesTable(){
		
		$pages = self::listPages();
		
		$html = '<table>';
		$html .= '<thead><tr><th>Page Title</th><th></th><th></th></tr></thead>';
		
		foreach ($pages as $page) {
			$html .= '<tr>';
			$html .= '<td>'.$page->page_title.'</td>';
			$html .= '<td><a href="dashboard.php?page=pages&edit='.$page->page_id.'" title="Edit Page">Edit</a></td>';
			$html .= '<td><a class="delete" href="dashboard.php?page=pages&delete='.$page->page_id.'" title="'.$page->page_title.'">[x]</a></td>';
			$html .= '</tr>';	
		}
		
		$html .= '</table>';
		
		echo $html;
		
	}
	
	public static function pageInfo($page){
		
		$dbh = new CandyDB();
		$sth = $dbh->prepare('SELECT * FROM '. DB_PREFIX .'pages WHERE page_id = "' . $page . '"');
		$sth->execute();
		
		return $sth->fetchAll();
		
	}
	
	public static function updatePage($title, $body, $rewrite, $template, $innav, $id){
	
		$innav = ($innav == 'on') ? 1 : 0;
	
		$dbh = new CandyDB();
		
		$sth = $dbh->prepare('UPDATE '. DB_PREFIX .'pages SET page_title="'. $title .'", page_body="'. addslashes($body) .'", page_template="'. $template .'", rewrite="'. $rewrite .'", innav="'. $innav .'" WHERE page_id="' . $id . '"');
		$sth->execute();
		

	}

	public static function addPage($title, $body, $template, $rewrite){
		
		$dbh = new CandyDB();
		$sth = $dbh->prepare('INSERT INTO '. DB_PREFIX .'pages (page_title, page_body, page_template, rewrite) VALUES ("'. $title .'", "'. addslashes($body) .'", "'. $template .'", "'. $rewrite .'")');
		$sth->execute();	
		
	}
	
	public static function deletePage($id){
		
		$dbh = new CandyDB();
		$sth = $dbh->prepare('DELETE FROM '. DB_PREFIX .'pages WHERE page_id="'. $id .'"');
		$sth->execute();
		
	}
	
}