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
			var decendentAnswer = promptForDecendents();
			var decendents = [];
			if (decendentAnswer == "yes"){
				decendents = getChildren(people,NameSearchResults);
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




					// if (decendentAnswer == "yes"){
					// 	decendents = initSearchForDecendents(people,NameSearchResults, decendents);
					// 	displayResults(decendents);
					// }
					// else if (input == "no")
					// {
					// 	initSearch(people);
					// }
					// else
					// {
					// alert("Invalid Entry. Please try again.");
					// }
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
function initSearchForDecendents(people, resultsArray, emptyDecendents,i = -1){
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
	return prompt("Please type the First Name of the person.");
}
function promptForLastName(){
	return prompt("Please type the Last Name of the person");
}
function promptForDecendents(){
	return prompt("Would you like to see this person's decendents?");
}
function promptForTraits(){
	return prompt("Please select the Trait to search by\nAge\nHeight\nWeight\nEye Color\nJob ");
}
function promptForAge(){
	return prompt("Please select the age to search for");
}
function promptForHeight(){
	return prompt("Please select the height to search for");
}
function promptForWeight(){
	return prompt("Please select the weight to search for");
}
function promptForEyeColor(){
	return prompt("Please select the eye color to search for");
}
function promptForJob(){
	return prompt("Please select the occupation to search for");
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
				// if (i >= arraylength)
				// 	return undefined;
				// else
					// do{
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
								// i++;
						// }
						// while (i < arraylength);
						return emptyArray;
	}
// function addSixTo(x){
//   return x + 6;
// }
