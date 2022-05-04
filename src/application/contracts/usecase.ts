abstract class UseCase {
  abstract perform(data?: any): Promise<any>;

  async execute(data?: any): Promise<any> {
    if (data) {
      if (data instanceof Object) {
        const fields = Object.keys(data);
        this.validate(fields, data);
      }
    }

    return await this.perform(data);
  }

  protected validate(fields: string[], data: any) {
    for (const field of fields) {
      if (!data[field]) {
        throw new Error(`This field ${field} is required!`);
      }
    }
  }
}

export { UseCase };
