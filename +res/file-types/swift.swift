

// this is a single line comment using two slashes.

/* this is also a comment,
   but written over multiple lines */

/* multiline comments
   /* can be nested! */
   so that you can block out code containing multiline comments
*/

// Swift variables are declared with "var" followed by a name, a type, and a value
var explicitDouble: Double = 70

// if the type is omitted, Swift will infer it from the variable's initial value
var implicitInteger = 70
var implicitDouble = 70.0
var 国 = "日本"

// Swift constants are declared with "let" followed by a name, a type, and a value
let numberOfBananas: Int = 10

// if the type is omitted, Swift will infer it from the constant's value
let numberOfApples = 3
let numberOfOranges = 5

// values of variables and constants can be interpolated in strings as follows
let appleSummary = "I have \(numberOfApples) apples."
let fruitSummary = "I have \(numberOfApples + numberOfOranges) pieces of fruit."

// in playgrounds, code can be placed in the global scope
println("Hello, world")

// define an array
var fruits = ["mango", "kiwi", "avocado"]

// example of if statement; .isEmpty, .count
if fruits.isEmpty {
    println("No fruits in my array.")
} else {
    println("There are \(fruits.count) items in my array")
}

// define a dictionary with four items, each with a person's name and age
let people = ["Anna": 67, "Beto": 8, "Jack": 33, "Sam": 25]

// now we use Swift's flexible enumerator system to extract both values in a single loop
for (name, age) in people {
    println("\(name) is \(age) years old.")
}

// functions and methods are declared with the "func" syntax
// the return type is specified with ->
func sayHello(personName: String) -> String {
    let greeting = "Hello, " + personName + "!"
    return greeting
}

// prints "Hello, Jane!"
println(sayHello("Jane"))

// parameter names can be made external and required for calling
// the external name can be the same as the parameter name by
// prefixing with an octothorpe (#)
// or can be defined separately.
func sayAge(#personName: String, personAge Age: Int) -> String {
    let result = "\(personName) is \(Age) years old."
    return result
}

// we can also specify the name of the parameter
println(sayAge(personName: "Jane", personAge: 42))

