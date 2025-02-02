import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { employeeId } = body;

    if (!employeeId?.trim()) {
      return NextResponse.json(
        { error: 'Employee ID is required' },
        { status: 400 }
      );
    }

    // TODO: Database check, password check, session token generation

    const response = NextResponse.json(
      {
        success: true,
        employeeId,
      },
      { status: 200 }
    );

    // Set cookies in the response
    // TODO: DB/session implementation
    response.cookies.set('isLoggedIn', 'true', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict'
    });
    
    response.cookies.set('employeeId', employeeId, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict'
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 