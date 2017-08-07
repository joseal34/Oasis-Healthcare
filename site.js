document.addEventListener('DOMContentLoaded', function(){ 
	names(); 
	paginator(50);
}, false);
 
function names()
{
	var abc        = "aaaaabcdeeeeefghiiiiiiijklmnooooooopqrstuuuuuuuvwxyz";
	var first_name = '';
	var last_name  = '';

	for (var i=1; i<=999; i++)
	{
		for(var j=0; j<Math.trunc(Math.random() * (8 - 4) + 4); j++)
		{
			var fname   = Math.floor(Math.random() * abc.length);
			var lname   = Math.floor(Math.random() * abc.length);
			first_name += abc.substring(fname, fname + 1);
			last_name  += abc.substring(lname, lname + 1);
		}

		var divNames = document.getElementById('employeesTable'); 

		var row = divNames.insertRow(i);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4); 

		cell1.innerHTML = i;
		cell2.innerHTML = capFirstLetter(first_name);
		cell3.innerHTML = capFirstLetter(last_name);
		cell4.innerHTML = " ";
		// cell5.innerHTML = "<img src='images/delete.png'>"; 
		cell5.innerHTML = "<span onclick='deletethis(this);' class='deleteR'> &times;</span>"; 

		first_name = '';
		last_name  = '';
	}
	document.getElementById('results').innerHTML  = (i ) + " Results";
}

function capFirstLetter(txt)
{
	return txt.charAt(0).toUpperCase() + txt.slice(1);
} 

function deletethis(t)
{ 
	var question = confirm('Are you sure?');
	if(question == true)
	{
		var tr  = t.parentNode.parentNode;
		t.parentNode.parentNode.parentNode.removeChild(tr);
		MyFunction();
	}
	else return false;
}

function searchEmployee()
{
	var inputText, filter, divTable, tr, td, td2;
	inputText = document.getElementById('formInput');
	filter    = inputText.value.toUpperCase();
	divTable  = document.getElementById('employeesTable')
	tr        = divTable.getElementsByTagName('tr');
	count     = 0; 

	for(var i=0; i<tr.length; i++)
	{
		var rowIndex = i+1;
		var cellIndex = i+1;
		td  = tr[i].getElementsByTagName('td')[1];
		td2 = tr[i].getElementsByTagName('td')[2];

		if(td2 || td)
		{
			if(td.innerHTML.toUpperCase().indexOf(filter) > -1 || td2.innerHTML.toUpperCase().indexOf(filter) > -1)
			{
				tr[i].style.display = "";
				count++;
			}
			else
			{
				tr[i].style.display = "none";
			}
		}

		if(inputText.value != '')
		{
			var link = "<a id='myLink' href='#' onclick='MyFunction();return false;' class='clear'> Clear </a>";
			document.getElementById('results').innerHTML = count + " Result for: <span class='keysearch'>" + inputText.value + '</span>' + link;
		}
		else
		{
			document.getElementById('results').innerHTML = tr.length-1 + " Results";
		}
	} 
}

function MyFunction()
{
	var divTable  = document.getElementById('employeesTable')
	var tr        = divTable.getElementsByTagName('tr');
	document.getElementById('formInput').value = '';
	document.getElementById('results').innerHTML = tr.length-1 + " Results"; 
	paginator(numPerPage);
};  
 
function paginator(num)
{
	$('.pager').hide();
	$('table.employeesTable').each(function()
	{
		var currentPage, $table, numberRows, numPages, $pager, $before;
		
		currentPage = 0;
		window.numPerPage = num;
		$table = $(this);

		$table.bind('repaginate', function()
		{
			$table.find('tbody tr').hide(); // To hide all the tr on the table (tbody) seccion, to exclude headers
			$table.find('tbody tr').slice(currentPage * numPerPage, (currentPage+1) * numPerPage).show(); //shows only the specific num of record per "page"
		});
		$table.trigger('repaginate');

		numberRows = $table.find('tbody tr').length; // Total of tr 
		console.log('# rows: ' + numberRows);
		numPages = Math.ceil(numberRows/numPerPage); // Total of "pages" to display on the paginator
		console.log('# pages: ' + numPages);
		$pager = $('<div class="pager"></div>'); // Div for the paginator buttons

		for( var i=0; i<numPages; i++ )
		{
			$('<span class="page-number"></span>').text(i+1).bind('click', 
			{
				newPage: i
			}, function (e)
			{
				currentPage = e.data['newPage'];
				$table.trigger('repaginate');
				$(this).addClass('active').siblings().removeClass('active');
			}).appendTo($pager).addClass('clickable');
		}
		$pager.insertBefore($table).find('span.page-number:first').addClass('active');
	});
}

window.onscroll = function()
{
	scrollToTop();
}

function scrollToTop()
{ 
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
	{
		document.getElementById('btnTop').style.display = "block";
	}
	else
	{
		document.getElementById('btnTop').style.display = "none";
	}
}

function tops()
{
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}