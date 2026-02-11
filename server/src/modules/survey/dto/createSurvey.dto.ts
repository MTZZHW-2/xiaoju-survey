import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';

export class CreateSurveyDto {
  @ApiProperty({ description: '投票标题', required: true })
  title: string;

  @ApiProperty({ description: '投票备注', required: false })
  remark: string;

  @ApiProperty({ description: '投票类型，复制投票必传', required: false })
  surveyType: string;

  @ApiProperty({ description: '创建方法', required: false })
  createMethod?: string;

  @ApiProperty({ description: '创建来源', required: false })
  createFrom?: string;

  @ApiProperty({ description: '投票创建在哪个空间下', required: false })
  workspaceId?: string;

  @ApiProperty({ description: '投票创建在哪个分组下', required: false })
  groupId?: string;

  @ApiProperty({ description: '题目列表', required: false })
  questionList?: Array<any>;

  static validate(data) {
    return Joi.object({
      title: Joi.string().required(),
      remark: Joi.string().allow(null, '').default(''),
      surveyType: Joi.string().when('createMethod', {
        is: 'copy',
        then: Joi.allow(null),
        otherwise: Joi.required(),
      }),
      createMethod: Joi.string()
        .allow(null)
        .valid('copy', 'textImport','AIGenerate','ExcelImport')
        .default('basic'),
      createFrom: Joi.string().when('createMethod', {
        is: 'copy',
        then: Joi.required(),
        otherwise: Joi.allow(null),
      }),
      workspaceId: Joi.string().allow(null, ''),
      groupId: Joi.string().allow(null, ''),
      questionList: Joi.allow(null),
    }).validate(data);
  }
}
