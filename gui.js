//search for multiple categories by associatig items to objects
function initSearch(people)
{
	var input = prompt("Do you know the name of the person you are searching for?");
		if(input == "yes")
		{
				var firstName = promptForFirstName();
				var lastName = promptForLastName();
				var NameSearchResults = initSearchByName(people,firstName,lastName);
				displayResults(NameSearchResults);
				if(NameSearchResults[0] != undefined){
						var decendentAnswer = promptForDecendents();
						var decendents = [];
						if (decendentAnswer == "yes"){
							decendents = initSearchForDecendents(people,NameSearchResults);
							displayResults(decendents);
						}
						else if (input == "no")
						{
							initSearch(people);
						}
						else
						{
						alert("Invalid Entry. Please try again.");
						}
						var immediateFamily = promptForImmediateFamily();
						if (decendentAnswer == "yes"){
							immediateFamily = getImmediateFamily(people,NameSearchResults);
							displayResults(immediateFamily);
						}
						else if (input == "no")
						{
							initSearch(people);
						}
						else
						{
						alert("Invalid Entry. Please try again.");
						}
					}
				else {
					alert('To begin a new Search, Please Click on the Start Searching Button');
				}
		}
		else if(input == "no")
		{
			var traitSearchResults = initSearchByTraits(people);
			displayResults(traitSearchResults);
		}
		else
		{
		alert("Invalid Entry. Please try again.");
		initSearch(people);
		}
}
function initSearchByName(people,fName, lName){
	return people.filter(function(person){
		if(fName.toLowerCase() == person.firstName.toLowerCase() && lName.toLowerCase() == person.lastName.toLowerCase())
		{
			return true;
		}
		else{
			return false;
		}
	});
}
function initSearchByTraits(people){
	var userSelection = promptForTraits();
	var trait = identifyTraitSelection(userSelection);
	if(userSelection == "age"){
			var cvtTrait = Number(trait);
			var peopleCvtAge = convertPersonAge(people);
			return peopleCvtAge.filter(function(person){
			return (cvtTrait == person.dob);
	});
	}
	else {
			return people.filter(function(person){
			return (trait.toLowerCase() == person.height || trait.toLowerCase() == person.weight ||trait.toLowerCase() == person.eyeColor ||trait.toLowerCase() == person.occupation);
		});
	}
}
function convertPersonAge(people){
	var currentYear = getCurrentYear();
	return people.map(function(person){
		var birthday = person.dob;
		var birthdayYear = getBirthdayYear(birthday);
		person.dob = currentYear - birthdayYear;
		return person;
	});
}
function getCurrentYear(){
	var establishDate = new Date;
	return establishDate.getFullYear();
}
function getBirthdayYear(personBirthday){
	var index = personBirthday.lastIndexOf("/");
	var stringBirthdayYear = personBirthday.substr(index+1);
	return Number(stringBirthdayYear);
}
function identifyTraitSelection(traitToSearch){
	switch (traitToSearch){//while loop for multiple search
		case "age":{
			return promptForAge();
		}
		case "height":{
			return promptForHeight();
		}
		case "weight":{
			return promptForWeight();
		}
		case "eye color":{
			return promptForEyeColor();
		}
		case "job":{
			return promptForJob();
		}
		default:
		("Invalid Selection. Please try again");
		initSearchByTraits(traitToSearch);
		}
}
function initSearchForDecendents(people, resultsArray, emptyDecendents = [],i = -1){
var arraylength = resultsArray.length;
	{if (i >= arraylength){
		return emptyDecendents;
	}
	else {
		var searchedPerson = getSearchedResult(resultsArray, i, arraylength);
		var newArray = people.filter(function(person){
			var parentsArray = person.parents;
			var firstParentId = getFirstResult(parentsArray);
			var secondParentId = getSecondResult(parentsArray);
			if((firstParentId == searchedPerson.id || secondParentId == searchedPerson.id)){
				return true;
			}
			else
			{return false;}
		});}
		i++;
		emptyDecendents = emptyDecendents.concat(newArray);
		return initSearchForDecendents(people, emptyDecendents, emptyDecendents,i);
	}
} function getSearchedResult(array, index, lengthOfArray){
if(index < 0)
		{
		index = index + 1;
		if (array[index] == undefined)
				return undefined;
		else return array[index];
		}
else
		if (array[index] == undefined)
				return undefined;
		else return array[index];
}
function getFirstResult(array){
	if (array[0] == undefined)
			return undefined;
	else return array[0];
}
function getSecondResult(array){
	if (array[1] == undefined)
			return undefined;
	else return array[1];
}
function promptForFirstName(){
	return prompt("Please type the First Name of the person.").toLowerCase();
}
function promptForLastName(){
	return prompt("Please type the Last Name of the person").toLowerCase();
}
function promptForDecendents(){
	return prompt("Would you like to see this person's decendents?").toLowerCase();
}
function promptForTraits(){
	return prompt("Please select the Trait to search by\nAge\nHeight\nWeight\nEye Color\nJob ").toLowerCase();
}
function promptForAge(){
	return prompt("Please select the age to search for").toLowerCase();
}
function promptForHeight(){
	return prompt("Please select the height to search for").toLowerCase();
}
function promptForWeight(){
	return prompt("Please select the weight to search for").toLowerCase();
}
function promptForEyeColor(){
	return prompt("Please select the eye color to search for").toLowerCase();
}
function promptForJob(){
	return prompt("Please select the occupation to search for").toLowerCase();
}
function promptForImmediateFamily(){
	return prompt("Would you like to see their immediate family?").toLowerCase();
}
function displayResults(results){
if (results == undefined || results[0] == undefined)
alert('We were unable to find any results.\n\nTo begin a new Search, Please Click on the Start Searching Button');
else
	var arrayLength = results.length;

	for (let i = 0; i < arrayLength;i++)
	{
		var object = results[i];
		var firstName = object.firstName;
		var lastName = object.lastName;
		var age = object.dob;
		var height = object.height;
		var weight = object.weight;
		var eyeColor = object.eyeColor;
		var job = object.occupation;
		alert('Here are the results for your entry: \nFirst Name: ' + firstName + '\nLastName: ' + lastName + '\nAge: ' + age + '\nWeight: ' + weight + '\nEye Color: ' + eyeColor + '\nOccupation: ' + job );
	}
}
function getImmediateFamily(people, resultsArray,emptyArray=[],i=0){
		var parents = getParents(people, resultsArray);
		if (parents != undefined)
			emptyArray = emptyArray.concat(parents);
		var spouse = getSpouse(people,resultsArray);
		if (spouse != undefined)
			emptyArray = emptyArray.concat(spouse);
		var siblings = getSiblings(people, resultsArray);
		if (siblings != undefined)
			emptyArray = emptyArray.concat(siblings);
		var children = getChildren(people, resultsArray);
		if (children != undefined)
			emptyArray = emptyArray.concat(children);
		return emptyArray;
}
function getParents(people, resultsArray, i = 0){
	var arrayLength = resultsArray.length;
	if (i >= arrayLength){
		return undefined;
	}
	else
		var searchedPerson = getSearchedResult(resultsArray,i);
		var parentsArray = searchedPerson.parents;
		var firstParentId = getFirstResult(parentsArray);
		var secondParentId = getSecondResult(parentsArray);
		var newArray = people.filter(function(person){
			if((firstParentId == person.id || secondParentId == person.id)){
				return true;
			}
			else
			{return false;}
		});
		return newArray;
}
	function getGrandParents(people, resultsArray, emptyArray = [], i = 0){
		var parentsArray = getParents(people,resultsArray);
		var arrayLength = parentsArray.length;
		if(parentsArray[0] == undefined)
			return undefined;
		else
			do{
						var searchedPerson = getSearchedResult(parentsArray,i);
						var grandParentsArray = searchedPerson.parents;
						var firstParentId = getFirstResult(grandParentsArray);
						var secondParentId = getSecondResult(grandParentsArray);
						var newArray = people.filter(function(person){
							if((firstParentId == person.id || secondParentId == person.id))
								return true;
							else
								return false;
						});
						emptyArray = emptyArray.concat(newArray);
						i++;
				}
				while (i < arrayLength);
				return emptyArray;
		}
		function getSpouse(people, resultsArray, i = 0){
				var searchedPerson = getSearchedResult(resultsArray,i);
				if (searchedPerson.currentSpouse == null)
					return undefined;
				else
					return people.filter(function(person){
						if((searchedPerson.currentSpouse == person.id)){
							return true;
						}});
			}
			function getChildren(people, resultsArray, emptyArray = [], i=0){
				var arraylength = resultsArray.length;
				var newArray = [];
				var searchedPerson = getSearchedResult(resultsArray,i);
				newArray = people.filter(function(person){
						var parentsArray = person.parents;
						var firstParentId = getFirstResult(parentsArray);
						var secondParentId = getSecondResult(parentsArray);
							if((searchedPerson.id == firstParentId || searchedPerson.id == secondParentId))
								return true;
							else
								return false;
					});
				emptyArray = emptyArray.concat(newArray);
				return emptyArray;
	}
	function getSiblings(people, resultsArray, emptyArray = [], i=0){
		var parentsArray = getParents(people,resultsArray);
		if (parentsArray[0] == undefined)
			return undefined;
		else
			var silbings =  getChildren(people, parentsArray);
			var searchedPerson = getSearchedResult(resultsArray,i);
			return silbings.filter(function(person){
				if((searchedPerson.id != person.id))
				return true;
				else
				return false;
		});
}
function getGrandChildren(people, resultsArray, emptyArray = [],i = 0){
	var children = getChildren(people, resultsArray);
	if (children[0] == undefined)
			return undefined;
	else
		var arraylength = children.length;
		var newArray = [];
		do{
			var searchedPerson = getSearchedResult(children,i);
			newArray = people.filter(function(person){
					var parentsArray = person.parents;
					var firstParentId = getFirstResult(parentsArray);
					var secondParentId = getSecondResult(parentsArray);
						if((searchedPerson.id == firstParentId || searchedPerson.id == secondParentId))
							return true;
						else
							return false;
			});
			i++;
		}
		while (arraylength > i);
		return newArray;
}
function getAuntUncle(people, resultsArray, emptyArray = [],i = 0){
	var grandparents = getGrandParents(people, resultsArray);
	if (grandparents == undefined)
			return undefined;
	else
		var arraylength = grandparents.length;
		var newArray = [];
		var silbings =  getChildren(people, grandparents);
		var parents = resultsArray[0].parents;
		do{
			var searchedPerson = getSearchedResult(parents,i);
			return silbings.filter(function(person){
				if((searchedPerson != person.id))
				return true;
				else
				return false;
			});
		}
		while (silbings > i);
}
function getNieceNephew(people, resultsArray, emptyArray = [], i=0){
	var parentsArray = getParents(people,resultsArray);
	if (parentsArray[0] == undefined)
		return undefined;
	var silbings = getChildren(people, parentsArray);
	if (silbings[0] == undefined)
		return undefined;
	var arraylength = silbings.length;
	do{
		var newArray = getChildren(people, silbings,emptyArray,i);
		emptyArray = emptyArray.concat(newArray);
		i++;
	}
	while(arraylength > i);
	return emptyArray;
}
