import 'package:aplicacionuno/src/presentation/pages/auth/register/RegisterBlocCubit.dart';
import 'package:aplicacionuno/src/presentation/widgets/DefaultButton.dart';
import 'package:aplicacionuno/src/presentation/widgets/DefaultIconBack.dart';
import 'package:aplicacionuno/src/presentation/widgets/DefaultTextfield.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:fluttertoast/fluttertoast.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  RegisterBlocCubit? _registerBlocCubit;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      _registerBlocCubit?.dispose();
    });
  }

  @override
  Widget build(BuildContext context) {
    _registerBlocCubit = BlocProvider.of<RegisterBlocCubit>(
      context,
      listen: false,
    );

    return Scaffold(
      body: Container(
        height: MediaQuery.of(context).size.height,
        width: MediaQuery.of(context).size.width,
        // color:const Color.fromARGB(255, 237, 11, 11),
        child: Stack(
          alignment: Alignment.center,
          children: [
            Image.asset(
              'assets/img/background1.jpg',
              height: MediaQuery.of(context).size.height,
              width: MediaQuery.of(context).size.width,
              fit: BoxFit.cover, //para que la imagen ocupe toda la pantalla
              color: Color.fromRGBO(0, 0, 0, 0.7), //opacidad
              colorBlendMode: BlendMode.darken,
            ),

            Container(
              height: MediaQuery.of(context).size.height * 0.85,
              width: MediaQuery.of(context).size.width * 0.75,
              decoration: BoxDecoration(
                color: Color.fromRGBO(255, 255, 255, 0.2),
                borderRadius: BorderRadius.all(Radius.circular(25)),
              ),
              //Etiquetas y botones
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    Icon(Icons.person, color: Colors.white, size: 100),
                    Text(
                      'REGISTRO',
                      style: TextStyle(
                        fontSize: 20,
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(left: 25, right: 25),
                      child: StreamBuilder(
                        stream: _registerBlocCubit?.nameStream,
                        builder: (context, snapshot) {
                          return DefaultTextfield(
                            label: 'Nombre',
                            errorText: snapshot.error
                                ?.toString(), //equivale a un null
                            icon: Icons.person,
                            onChanged: (text) {
                              _registerBlocCubit?.changeName(text);
                            },
                          );
                        },
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(left: 25, right: 25),
                      child: StreamBuilder(
                        stream: _registerBlocCubit?.lastnameStream,
                        builder: (context, snapshot) {
                          return DefaultTextfield(
                            label: 'Apellido',
                            errorText: snapshot.error
                                ?.toString(), //equivale a un null
                            icon: Icons.person,
                            onChanged: (text) {
                              _registerBlocCubit?.changelastname(text);
                            },
                          );
                        },
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(left: 25, right: 25),
                      child: StreamBuilder(
                        stream: _registerBlocCubit?.emailStream,
                        builder: (context, snapshot) {
                          return DefaultTextfield(
                            label: 'Email',
                            errorText: snapshot.error?.toString(),
                            icon: Icons.email,
                            onChanged: (text) {
                              _registerBlocCubit?.changeEmail(text);
                            },
                          );
                        },
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(left: 25, right: 25),
                      child: StreamBuilder(
                        stream: _registerBlocCubit?.phoneStream,
                        builder: (context, asyncSnapshot) {
                          return DefaultTextfield(
                            label: 'Teléfono',
                            errorText: asyncSnapshot.error?.toString(),
                            icon: Icons.phone,
                            onChanged: (text) {
                              _registerBlocCubit?.changePhone(text);
                            },
                          );
                        },
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(left: 25, right: 25),
                      child: StreamBuilder(
                        stream: _registerBlocCubit?.passwordStream,
                        builder: (context, asyncSnapshot) {
                          return DefaultTextfield(
                            label: 'Contraseña',
                            errorText: asyncSnapshot.error?.toString(),
                            icon: Icons.lock,
                            obscureText: true, //ocultar la contraseña
                            onChanged: (text) {
                              _registerBlocCubit?.changePassword(text);
                            },
                          );
                        },
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(left: 25, right: 25),
                      child: StreamBuilder(
                        stream: _registerBlocCubit?.confirPasswordmStream,
                        builder: (context, asyncSnapshot) {
                          return DefaultTextfield(
                            label: 'Confirmar contraseña',
                            errorText: asyncSnapshot.error?.toString(),
                            icon: Icons.lock_clock_outlined,
                            obscureText: true,
                            onChanged: (text) {
                              _registerBlocCubit?.changeConfirmPassword(text);
                            },
                          );
                        },
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(left: 25, right: 25, top: 15),
                      child: StreamBuilder(
                        stream: _registerBlocCubit?.validateForm,
                        builder: (context, snapshot) {
                          return Defaultbutton(
                            text: 'Registrarse',
                            color: snapshot.hasData
                                ? const Color.fromARGB(255, 173, 46, 46)
                                : Colors.grey,
                            //  color: Colors.cyan,
                            onPressed: () {
                              if (snapshot.hasData) {
                                _registerBlocCubit?.register();
                              } else {
                                Fluttertoast.showToast(
                                  msg: 'El formulario no es válido',
                                  toastLength: Toast.LENGTH_LONG,
                                );
                              }
                            },
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Defaulticonback(left: 75, top: 100),
          ],
        ),
      ),
    );
  }
}
