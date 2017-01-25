//search for multiple categories by associatig items to objects
function initSearch(people){
	var input = prompt("Do you know the name of the person you are searching for?");
		if(input == "yes")
		{
			var NameSearchResults = initSearchByName(people);
			displayResults(NameSearchResults);
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
function initSearchByName(people){
	var firstName = promptForFirstName();
	var lastName = promptForLastName();
	return people.filter(function(person){
		if(firstName.toLowerCase() == person.firstName.toLowerCase() && lastName.toLowerCase() == person.lastName.toLowerCase())
		{
			return true;
		}
		else
		{
			return false;
		}
	});
}
function promptForFirstName(){
	var firstName = prompt("Please type the First Name of the person.");
	return firstName;
}
function promptForLastName(){
	var lastName = prompt("Please type the Last Name of the person");
	return lastName;
}
function initSearchByTraits(people){
	var userSelection = promptForTraits();
	var trait = identifyTraitSelection(userSelection);
	var cvtTrait = Number(trait);
	if(userSelection == "age"){
			var peopleCvtAge = convertPersonAge(people);
			return peopleCvtAge.filter(function(person){
			return (cvtTrait == person.dob);
	});
	}
	else {
		//var lowerCaseSelection = userSelection.toLowerCase();
			return people.filter(function(person){
			//if(trait.toLowerCase() == person[lowerCaseSelection] && trait.toLowerCase() == person[lowerCaseSelection])
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
	// while()
	// {
	switch (traitToSearch){
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
	var arrayLength = results.length;
	for (let i = 0; i < arrayLength;i++)
	{
		var object = results[0];
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

// function isNumeric() {
// 	;
// }
// function getAge(){
// 	;
// }
// function getHeight(){
// 	;
// }
// function getWeight(){
// 	;
// }
// function getEye(){
// 	;
// }
// function getOccupation(){
// 	;
// }
