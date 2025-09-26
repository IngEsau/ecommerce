import 'package:flutter/material.dart';

class DefaultTextfield extends StatelessWidget {
  String label;
  String ? errorText; //propiedad string opcional
  IconData icon;//propiedad IconData
  Function(String text) onChanged;
  bool obscureText; //función con párametro
 
  DefaultTextfield({//constructor
    required this.label,//required = obligatorio
    required this.icon,
    required this.onChanged,
    this.errorText,//método
    this.obscureText=false //para la contraseña
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      obscureText: obscureText,//para la contraseña
      onChanged:(text){
        onChanged(text);

      } ,
      decoration: InputDecoration(
        label: Text(
          label,
          style: TextStyle(color: Colors.white),
        ),
        errorText: errorText,
        prefixIcon: Icon(icon, color: Colors.white),
        enabledBorder: UnderlineInputBorder(
          borderSide: BorderSide(color: Colors.white),
        ),
        focusedBorder: UnderlineInputBorder(
          borderSide: BorderSide(color: Colors.white),
        ),
      ),
      style: TextStyle(
        color: Colors.white
      ),
    );
  }
}
