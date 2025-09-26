import 'package:aplicacionuno/src/presentation/pages/auth/login/LoginBlocCubit.dart';
import 'package:aplicacionuno/src/presentation/pages/auth/register/RegisterBlocCubit.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

List<BlocProvider> blocProviders=[
  BlocProvider<LoginBlocCubit>(
    create: (context)=>LoginBlocCubit(),
  ),
  BlocProvider<RegisterBlocCubit>(
    create: (context)=>RegisterBlocCubit(),
  ),
];