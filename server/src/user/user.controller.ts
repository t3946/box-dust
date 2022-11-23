import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from '@src/user/user.service';
import CreateUserDto from '@src/user/dto/create-user.dto';
import UpdateUserDto from '@src/user/dto/update-user.dto';
import { User } from '@src/auth/decorators/user.decorator';
import { MailService } from '@src/mail/mail.service';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Record<any, any>> {
    try {
      return { user: await this.userService.create(createUserDto) };
    } catch (e) {
      throw new HttpException(e, HttpStatus.FORBIDDEN);
    }
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  public async update(
    @User() user: Record<any, any>,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Record<any, any>> {
    try {
      return {
        user: await this.userService.update(updateUserDto, user.user_id),
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('register/send-confirm-email')
  @HttpCode(HttpStatus.OK)
  public async sendConfirmEmail(@Query('email') email: string): Promise<void> {
    try {
      const code = await this.userService.getConfirmEmailCode(email);

      await this.mailService.sendRegisterConfirm(email, code);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('register/confirm-email')
  @HttpCode(HttpStatus.OK)
  public async registerConfirm(
    @Query('email') email: string,
    @Query('code') code: string,
  ): Promise<Record<any, any>> {
    try {
      return { user: await this.userService.confirmUser(email, code) };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('change-partnership')
  @HttpCode(HttpStatus.OK)
  public async updatePartnership(
    @User() user: Record<any, any>,
    @Query('partnerShipSlug') partnerShipSlug: string,
  ): Promise<void> {
    try {
      await this.userService.updatePartnership(user.user_id, partnerShipSlug);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}

export default UserController;
