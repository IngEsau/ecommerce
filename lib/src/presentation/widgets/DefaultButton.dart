import 'package:flutter/material.dart';

class Defaultbutton extends StatelessWidget {
  String text;
  Function() onPressed;
  Color color;

  Defaultbutton({
    required this.text,//obligatorio
    required this.onPressed,//obligatorio
    this.color = Colors.black,//no obligatorio
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      height: 55, //ancho del botón
     // margin: EdgeInsets.only(left: 25, right: 25, top: 15, bottom: 15),
      child: ElevatedButton(
        onPressed: () {
         onPressed();// Navigator.pushNamed(context, 'register');
        },

        style: ElevatedButton.styleFrom(backgroundColor:color),
        child: Text(text, style: TextStyle(color: Colors.black)),
      ),
    );
  }
}
