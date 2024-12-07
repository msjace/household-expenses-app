export class TextTransformer {
  public static parseFirebaseError(error: any): string {
    switch (error.code) {
      case 'auth/invalid-credential':
        return 'Invalid password or email.'
      case 'auth/email-already-in-use':
        return 'Email is already in use.'
      case 'auth/invalid-email':
        return 'Email is invalid.'
      case 'auth/user-not-found':
        return 'User not found.'
      case 'auth/operation-not-allowed':
        return 'Operation is not allowed.'
      default:
        return error.message
    }
  }
}
