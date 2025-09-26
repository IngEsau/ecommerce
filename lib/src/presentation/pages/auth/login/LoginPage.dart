import 'package:aplicacionuno/src/presentation/pages/auth/login/LoginBlocCubit.dart';
import 'package:aplicacionuno/src/presentation/widgets/DefaultTextfield.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:fluttertoast/fluttertoast.dart';

class LoginPage extends StatefulWidget {//Cambio de estados
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  LoginBlocCubit? _loginBlocCubit;//variable privada

  @override
  void initState() {
    //Solo se ejecuta una vez, cuando carga la pantalla
    super.initState();
    //para volver a establecer el estado de nuestros string a su valor original
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      _loginBlocCubit?.dispose();
    });
  }

  @override
  Widget build(BuildContext context)//build:se construye cada control+s
   {
    //Se inicializa _loginBlocCubit
    _loginBlocCubit = BlocProvider.of<LoginBlocCubit>(context, listen: false);

    return Scaffold(
      body: SizedBox(
        width: double.infinity,
        child: Stack(
          alignment: Alignment.center,
          children: [
            Image.asset(
              'assets/img/background2.jpg',
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height,
              fit: BoxFit.cover,
              color: Colors.black54,
              colorBlendMode: BlendMode.darken,
            ),

            Container(
              width: MediaQuery.of(context).size.width * 0.85,
              height: MediaQuery.of(context).size.height * 0.75,
              decoration: BoxDecoration(
                color: Color.fromRGBO(255, 255, 255, 0.2),
                borderRadius: BorderRadius.all(Radius.circular(25)),
              ),

              child: SingleChildScrollView(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center, //vertical
                  crossAxisAlignment: CrossAxisAlignment.center, //horizontal
                  children: [
                    Icon(Icons.person, color: Colors.white, size: 125),
                    Text(
                      'LOGIN',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(
                        left: 25,
                        right: 25,
                      ), //acortar las lineas
                      child: StreamBuilder(
                        stream: _loginBlocCubit?.emailStream,
                        builder: (context, snapshot) {
                          return DefaultTextfield(
                            label: 'Correo electrónico',
                            icon: Icons.email,
                            errorText: snapshot.error?.toString(),
                            onChanged: (text) {
                              _loginBlocCubit?.changeEmail(text);//recibe los datos del usuario
                            },
                          );
                        },
                      ),
                    ),

                    Container(
                      margin: EdgeInsets.only(left: 25, right: 25),
                      child: StreamBuilder<Object>(
                        stream: _loginBlocCubit?.passwordStream,
                        builder: (context, snapshot) {
                          return DefaultTextfield(
                            label: 'Contraseña',
                            errorText: snapshot.error?.toString(),
                            icon: Icons.lock,
                            onChanged: (text) {
                              _loginBlocCubit?.changePassword(text);
                            },
                            obscureText: true, //para la contraseña
                          );
                        },
                      ),
                    ),

                    Container(
                      width: MediaQuery.of(context).size.width,
                      height: 55, //ancho del botón
                      margin: EdgeInsets.symmetric(
                        horizontal: 25,
                        vertical: 25,
                      ), //espacios del botón
                      child: StreamBuilder(
                        stream:_loginBlocCubit?.validateForm,
                        builder: (context, snapshot) {
                          return ElevatedButton(
                            onPressed: () {
                              if(snapshot.hasData)//valida si tiene información
                              {
                               
                              _loginBlocCubit?.login();
                              }{
                                Fluttertoast.showToast(msg: "",
                                toastLength: Toast.LENGTH_LONG);
                             //  print('No valido');
                              }
                                                         
                            }, //navegar a la pantalla
                            style: ElevatedButton.styleFrom(
                              backgroundColor:snapshot.hasData ? Colors.amber : Colors.blueGrey
                            ),
                            child: Text(
                              'Iniciar Sesión',
                              style: TextStyle(color: Colors.black),
                            ),
                          );
                        }
                      ),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center, //horizontal
                      children: [
                        Container(
                          width: 65,
                          height: 1,
                          color: Colors.white,
                          margin: EdgeInsets.only(right: 5),
                        ),
                        Text(
                          '¿No tienes cuenta?',
                          style: TextStyle(color: Colors.white, fontSize: 17),
                        ),
                        Container(
                          width: 65,
                          height: 1,
                          color: Colors.white,
                          margin: EdgeInsets.only(left: 5),
                        ),
                      ],
                    ),

                    Container(
                      width: MediaQuery.of(context).size.width,
                      height: 55, //ancho del botón
                      margin: EdgeInsets.only(
                        left: 25,
                        right: 25,
                        top: 15,
                        bottom: 15,
                      ),
                      child: ElevatedButton(
                        onPressed: () {
                           Navigator.pushNamed(context, 'register');
                        },

                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.green,
                        ),
                        child: Text(
                          'Registrate',
                          style: TextStyle(color: Colors.black),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
