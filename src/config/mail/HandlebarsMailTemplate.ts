import Handlebars, { template } from "handlebars";
import fs from "fs";


interface ITemplateVariables {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariables;
}

export default class HandlebarsMailTemplate {
  public async parseTemplate({file, variables}: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    });
    const parseTemplate = Handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}