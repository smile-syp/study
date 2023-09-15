import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
var Person = /*#__PURE__*/function () {
  function Person() {
    _classCallCheck(this, Person);
  }
  _createClass(Person, [{
    key: "sayname",
    value: function sayname() {
      return 'name';
    }
  }]);
  return Person;
}();
var john = new Person();
console.log(john);
